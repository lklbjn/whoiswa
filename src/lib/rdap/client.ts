import { getRDAPServer } from './servers';
import { extractTLD } from '../domain-parser';
import { RDAPResponse } from '@/types/rdap';

export class RDAPClient {
  async query(domain: string): Promise<RDAPResponse> {
    const tld = extractTLD(domain);
    if (!tld) {
      throw new Error('Invalid domain');
    }

    let server = await getRDAPServer(tld);
    
    let url = '';
    if (server) {
        url = `${server}domain/${domain}`;
    } else {
        // Fallback to rdap.org which handles redirection
        url = `https://rdap.org/domain/${domain}`;
    }

    console.log(`Querying RDAP for ${domain} at ${url}`);

    const response = await fetch(url, {
        headers: {
            'Accept': 'application/rdap+json'
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Domain not found');
        }
        throw new Error(`RDAP query failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}
