"use client"

import { QueryForm } from '@/components/QueryForm';
import { HistoryList } from '@/components/HistoryList';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-center">
            {t.home.title}
        </h1>
        <p className="text-muted-foreground text-center max-w-lg">
            {t.home.subtitle}
        </p>
        
        <div className="flex flex-col items-center w-full gap-4">
            <QueryForm />
            <HistoryList />
        </div>
      </div>
    </main>
  );
}
