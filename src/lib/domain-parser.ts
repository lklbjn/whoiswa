// @ts-ignore
import psl from 'psl';

export function extractTLD(domain: string): string | null {
  const parsed = psl.parse(domain);
  if (parsed.error) return null;
  // @ts-ignore
  return parsed.tld || null;
}

export function isValidDomain(domain: string): boolean {
  return psl.isValid(domain);
}
