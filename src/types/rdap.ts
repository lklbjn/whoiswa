export interface RDAPEntity {
  objectClassName: string;
  handle: string;
  roles: string[];
  vcardArray?: any[];
  entities?: RDAPEntity[];
  remarks?: RDAPRemark[];
}

export interface RDAPEvent {
  eventAction: string;
  eventDate: string;
}

export interface RDAPNameserver {
  objectClassName: string;
  ldhName: string;
}

export interface RDAPRemark {
  title?: string;
  description: string[];
}

export interface RDAPResponse {
  objectClassName: string;
  handle: string;
  ldhName: string;
  status?: string[];
  nameservers?: RDAPNameserver[];
  events?: RDAPEvent[];
  entities?: RDAPEntity[];
  remarks?: RDAPRemark[];
  notices?: RDAPRemark[];
  port43?: string;
}

export interface DomainInfo {
  domain: string;
  status: string[];
  createDate?: string;
  updateDate?: string;
  expiryDate?: string;
  registrar?: string;
  registrarIANAID?: string;
  nameservers: string[];
  whoisServer?: string;
  serverIp?: string;
  serverLocation?: string;
  serverIsp?: string;
  raw?: any;
  rawText?: string;
  source: 'RDAP' | 'WHOIS';
}
