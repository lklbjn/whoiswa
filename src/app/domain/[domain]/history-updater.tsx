'use client';

import { useEffect } from 'react';

export function HistoryUpdater({ domain }: { domain: string }) {
  useEffect(() => {
    const saved = localStorage.getItem('domain_history');
    let history: string[] = saved ? JSON.parse(saved) : [];
    
    // Add to top, remove duplicates, limit to 10
    history = [domain, ...history.filter(d => d !== domain)].slice(0, 10);
    
    localStorage.setItem('domain_history', JSON.stringify(history));
  }, [domain]);

  return null;
}
