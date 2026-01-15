import { RDAPClient } from './rdap/client';
import { WHOISClient } from './whois/client';
import { whoisToRdap } from './whois/converter';
import { RDAPResponse, DomainInfo } from '@/types/rdap';
import * as dns from 'node:dns/promises';

export class DomainLookupService {
  private rdap: RDAPClient;
  private whois: WHOISClient;

  constructor() {
    this.rdap = new RDAPClient();
    this.whois = new WHOISClient();
  }

  async lookup(domain: string): Promise<DomainInfo> {
    try {
      console.log(`Starting lookup for ${domain}`);
      
      // Start Server Info resolution in parallel immediately
      // Set a timeout of 1.5s for server info to prevent blocking the main response
      const serverInfoPromise = Promise.race([
        this.resolveServerInfo(domain),
        new Promise<{}>((resolve) => setTimeout(() => resolve({}), 1500))
      ]);

      let domainInfo: DomainInfo;

      // 1. Try RDAP
      try {
        const rdapData = await this.rdap.query(domain);
        domainInfo = this.transformToDomainInfo(rdapData, 'RDAP');
        // For RDAP, we can use JSON.stringify as rawText
        domainInfo.rawText = JSON.stringify(rdapData, null, 2);
      } catch (error) {
        console.warn('RDAP failed, falling back to WHOIS', error);
        
        // 2. Fallback to WHOIS
        try {
          const { response: whoisData, server: whoisServer } = await this.whois.query(domain);
          const rdapFormat = whoisToRdap(domain, whoisData);
          rdapFormat.port43 = whoisServer; // Inject server info
          
          domainInfo = this.transformToDomainInfo(rdapFormat, 'WHOIS');
          // For WHOIS, we use the original text response
          domainInfo.rawText = whoisData;
        } catch (whoisError) {
          throw new Error(`Both RDAP and WHOIS failed: ${whoisError instanceof Error ? whoisError.message : String(whoisError)}`);
        }
      }

      // 3. Wait for Server Info (it should be running in parallel)
      const serverInfo = await serverInfoPromise;
      
      return {
          ...domainInfo,
          ...serverInfo
      };

    } catch (e) {
        throw e;
    }
  }

  private async resolveServerInfo(domain: string): Promise<{ serverIp?: string; serverLocation?: string; serverIsp?: string }> {
    try {
      // 1. Resolve A record
      const ips = await dns.resolve4(domain).catch(() => []);
      if (ips.length === 0) return {};

      const ip = ips[0];
      
      // 2. Get GeoIP info
      // Using ip-api.com (free for non-commercial, rate limited)
      // fields=status,country,regionName,city,isp
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp`);
      const data = await response.json();
      
      if (data.status === 'success') {
          return {
              serverIp: ip,
              serverLocation: `${data.city}, ${data.regionName}, ${data.country}`,
              serverIsp: data.isp
          };
      }
      return { serverIp: ip };
    } catch (e) {
      console.error('Failed to resolve server info', e);
      return {};
    }
  }

  private transformToDomainInfo(data: RDAPResponse, source: 'RDAP' | 'WHOIS'): DomainInfo {
    // Extract key info
    let createDate = '';
    let expiryDate = '';
    let updateDate = '';

    if (data.events) {
        createDate = data.events.find(e => e.eventAction === 'registration')?.eventDate || '';
        expiryDate = data.events.find(e => e.eventAction === 'expiration')?.eventDate || '';
        updateDate = data.events.find(e => e.eventAction === 'last changed')?.eventDate || '';
    }

    // Registrar
    let registrar = '';
    let registrarIANAID = '';
    
    if (data.entities) {
        // Recursively find registrar
        const findRegistrar = (entities: any[]) => {
            for (const entity of entities) {
                if (entity.roles?.includes('registrar')) {
                    const vcard = entity.vcardArray;
                    if (vcard) {
                        // Very basic vcard parsing
                         const fn = vcard[1]?.find((item: any) => item[0] === 'fn');
                         if (fn) registrar = fn[3];
                    }
                    
                    // Public IDs
                    // @ts-ignore
                    if (entity.publicIds) {
                        // @ts-ignore
                        registrarIANAID = entity.publicIds[0]?.identifier;
                    }
                    return true;
                }
                if (entity.entities) {
                    if (findRegistrar(entity.entities)) return true;
                }
            }
            return false;
        };
        findRegistrar(data.entities);
    }

    return {
        domain: data.handle || data.ldhName,
        status: data.status || [],
        createDate,
        expiryDate,
        updateDate,
        registrar,
        registrarIANAID,
        nameservers: data.nameservers?.map(ns => ns.ldhName) || [],
        whoisServer: data.port43,
        source,
        raw: data
    };
  }
}
