'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function HistoryList() {
  const [history, setHistory] = useState<string[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('domain_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-sm">
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{t.home.recentSearches}</h3>
      <div className="flex flex-wrap gap-2">
          {history.map(domain => (
              <Button key={domain} variant="outline" size="sm" asChild>
                  <Link href={`/domain/${domain}`}>{domain}</Link>
              </Button>
          ))}
      </div>
    </div>
  );
}
