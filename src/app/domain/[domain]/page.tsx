import { DomainLookupService } from '@/lib/domain-lookup';
import { isValidDomain } from '@/lib/domain-parser';
import { DomainPageContent } from '@/components/DomainPageContent';

// Server Component
export default async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  if (!isValidDomain(domain)) {
     return (
        <DomainPageContent domain={domain} error="Invalid domain format" />
     );
  }

  const lookupService = new DomainLookupService();
  let data;
  let error;

  try {
    data = await lookupService.lookup(domain);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <DomainPageContent domain={domain} data={data} error={error} />
  );
}
