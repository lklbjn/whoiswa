// Cache the server list in memory for the lambda lifetime
let serverCache: Map<string, string> | null = null;

export async function getRDAPServer(tld: string): Promise<string | null> {
  if (!serverCache) {
    await refreshServerList();
  }
  return serverCache?.get(tld) || null;
}

async function refreshServerList() {
  try {
    const response = await fetch('https://data.iana.org/rdap/dns.json', {
        next: { revalidate: 86400 } // Revalidate every 24 hours
    });
    if (!response.ok) throw new Error('Failed to fetch RDAP servers');
    
    const data = await response.json();
    const map = new Map<string, string>();
    
    for (const entry of data.services) {
        const servers = entry[1];
        const tlds = entry[0];
        const server = servers[0]; // Use the first server
        
        for (const tld of tlds) {
            map.set(tld, server);
        }
    }
    serverCache = map;
  } catch (error) {
    console.error('Error fetching RDAP server list:', error);
    // Fallback or retry logic could be added here
  }
}
