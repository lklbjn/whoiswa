"use client"

import { DomainInfo as DomainInfoType } from '@/types/rdap';
import { DomainInfo } from '@/components/DomainInfo';
import { QueryForm } from '@/components/QueryForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from './Header';
import { HistoryUpdater } from '@/app/domain/[domain]/history-updater';

interface DomainPageContentProps {
  domain: string;
  data?: DomainInfoType;
  error?: string;
}

export function DomainPageContent({ domain, data, error }: DomainPageContentProps) {
  const { t } = useLanguage();

  if (error) {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
            <div className="w-full max-w-md flex flex-col gap-8">
                <Header />
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t.errors.generic}</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                    <div className="mt-4">
                        <Button asChild variant="outline" className="w-full bg-background text-foreground">
                            <Link href="/">{t.home.searchButton}</Link>
                        </Button>
                    </div>
                </Alert>
            </div>
        </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
       <div className="w-full max-w-5xl flex flex-col gap-8">
            <div className="flex justify-between items-center gap-4">
                <Header />
                <div className="hidden md:block w-full max-w-xs">
                    <QueryForm initialValue={domain} />
                </div>
            </div>
            
            <div className="md:hidden w-full">
                 <QueryForm initialValue={domain} />
            </div>

            <div className="flex-1">
                {data && (
                    <>
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">{data.domain}</h1>
                            <p className="text-muted-foreground">{t.brand.description}</p>
                        </div>
                        <DomainInfo data={data} />
                        <HistoryUpdater domain={domain} />
                    </>
                )}
            </div>
       </div>
    </main>
  );
}
