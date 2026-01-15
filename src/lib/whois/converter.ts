import { RDAPResponse } from '@/types/rdap';

export function whoisToRdap(domain: string, whoisText: string): RDAPResponse {
    // Basic regex extraction
    const creationDate = whoisText.match(/Creation Date: (.+)/i)?.[1] || 
                         whoisText.match(/Created on: (.+)/i)?.[1] ||
                         whoisText.match(/Registration Time: (.+)/i)?.[1];
                         
    const expiryDate = whoisText.match(/Registry Expiry Date: (.+)/i)?.[1] || 
                       whoisText.match(/Expiration Date: (.+)/i)?.[1] ||
                       whoisText.match(/Expiration Time: (.+)/i)?.[1];
                       
    const registrar = whoisText.match(/Registrar: (.+)/i)?.[1];
    
    // Nameservers
    const nameservers: string[] = [];
    const nsRegex = /Name Server: (.+)/gi;
    let match;
    while ((match = nsRegex.exec(whoisText)) !== null) {
        nameservers.push(match[1].trim().toLowerCase());
    }
    // Handle uniqueness
    const uniqueNameservers = Array.from(new Set(nameservers));

    return {
        objectClassName: 'domain',
        handle: domain,
        ldhName: domain,
        status: ['active'], // Dummy status
        nameservers: uniqueNameservers.map(ns => ({ objectClassName: 'nameserver', ldhName: ns })),
        events: [
            { eventAction: 'registration', eventDate: creationDate || '' },
            { eventAction: 'expiration', eventDate: expiryDate || '' }
        ],
        entities: registrar ? [{
            objectClassName: 'entity',
            handle: '',
            roles: ['registrar'],
            vcardArray: ['vcard', [['fn', {}, 'text', registrar]]]
        }] : [],
        remarks: [{
            title: 'Source',
            description: ['Data converted from WHOIS (fallback)']
        }],
        port43: 'whois.verisign-grs.com' // Should be dynamic
    };
}
