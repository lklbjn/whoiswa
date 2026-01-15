import { NextRequest, NextResponse } from 'next/server';
import { DomainLookupService } from '@/lib/domain-lookup';
import { isValidDomain } from '@/lib/domain-parser';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  const { domain } = await params;
  
  if (!domain || !isValidDomain(domain)) {
    return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 });
  }

  const lookupService = new DomainLookupService();
  
  try {
    const data = await lookupService.lookup(domain);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Lookup error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    if (message.includes('not found')) {
         return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
