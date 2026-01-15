import net from 'net';

export interface WhoisResult {
    response: string;
    server: string;
}

export class WHOISClient {
  async query(domain: string, server?: string): Promise<WhoisResult> {
    const whoisServer = server || await this.getWhoisServer(domain);
    if (!whoisServer) {
        throw new Error('No WHOIS server found');
    }

    console.log(`Querying WHOIS for ${domain} at ${whoisServer}`);

    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      let data = '';

      // Timeout 10s
      socket.setTimeout(10000);

      socket.connect(43, whoisServer, () => {
        socket.write(`${domain}\r\n`);
      });

      socket.on('data', (chunk) => {
        data += chunk;
      });

      socket.on('end', () => {
        resolve({ response: data, server: whoisServer });
      });

      socket.on('timeout', () => {
        socket.destroy();
        reject(new Error('WHOIS query timeout'));
      });

      socket.on('error', (err) => {
        reject(err);
      });
    });
  }

  // Simple WHOIS server lookup (hardcoded for MVP)
  // In a real app, we might want to fetch a list or use RDAP to find the port 43 server if available
  private async getWhoisServer(domain: string): Promise<string | null> {
    const tld = domain.split('.').pop();
    const servers: Record<string, string> = {
        'com': 'whois.verisign-grs.com',
        'net': 'whois.verisign-grs.com',
        'org': 'whois.pir.org',
        'io': 'whois.nic.io',
        'cn': 'whois.cnnic.cn',
        'ai': 'whois.nic.ai',
        'co': 'whois.nic.co',
        'me': 'whois.nic.me',
        // Add more common ones
    };
    
    if (!tld) return null;
    
    return servers[tld] || `whois.nic.${tld}`; // educated guess
  }
}
