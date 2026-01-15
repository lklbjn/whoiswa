declare module 'psl' {
  export function parse(domain: string): any;
  export function isValid(domain: string): boolean;
}
