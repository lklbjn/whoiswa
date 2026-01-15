'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export function QueryForm({ initialValue = '' }: { initialValue?: string }) {
  const [domain, setDomain] = useState(initialValue);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setLoading(true);
    router.push(`/domain/${domain}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input 
        type="text" 
        placeholder={t.home.placeholder} 
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? '...' : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
}
