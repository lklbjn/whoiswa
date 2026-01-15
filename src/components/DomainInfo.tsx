"use client"

import { DomainInfo as DomainInfoType } from '@/types/rdap';
import { InfoCard } from './InfoCard';
import { Calendar, Server, Building2, Globe, ShieldCheck, HardDrive, FileText, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DomainInfo({ data }: { data: DomainInfoType }) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, locale } = useLanguage();

  const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US');
  };

  const getDaysUntil = (dateStr?: string) => {
    if (!dateStr) return null;
    const days = differenceInDays(new Date(dateStr), new Date());
    return days;
  };

  const getAge = (dateStr?: string) => {
    if (!dateStr) return null;
    const days = differenceInDays(new Date(), new Date(dateStr));
    
    if (locale === 'zh') {
        return `${days} 天前注册`;
    }
    
    return `${days} days ago`;
  };

  const getStatusText = (status: string) => {
    const normalizedStatus = status.toLowerCase().trim();
    const mappedStatus = t.domainInfo.statusMap[normalizedStatus];
    
    if (locale === 'zh' && mappedStatus) {
        return `${status} (${mappedStatus})`;
    }
    
    return mappedStatus || status;
  };

  const handleCopy = () => {
    const text = data.rawText || JSON.stringify(data.raw, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysUntilExpiry = getDaysUntil(data.expiryDate);
  const domainAge = getAge(data.createDate);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <InfoCard title={t.domainInfo.status} icon={ShieldCheck}>
        <div className="flex flex-wrap gap-2">
            {data.status.map(s => (
                <Badge key={s} variant="secondary">{getStatusText(s)}</Badge>
            ))}
            {data.status.length === 0 && <span className="text-sm text-muted-foreground">{t.domainInfo.active}</span>}
        </div>
      </InfoCard>

      <InfoCard title={t.domainInfo.dates} icon={Calendar}>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.domainInfo.registered}:</span>
                <div className="text-right">
                    <div>{formatDate(data.createDate)}</div>
                    {domainAge && <div className="text-xs text-muted-foreground">({domainAge})</div>}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.domainInfo.expires}:</span>
                <div className="text-right">
                    <div className="font-medium text-orange-600 dark:text-orange-400">{formatDate(data.expiryDate)}</div>
                    {daysUntilExpiry !== null && (
                        <div className={`text-xs ${daysUntilExpiry < 30 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                            ({daysUntilExpiry} {t.domainInfo.daysLeft})
                        </div>
                    )}
                </div>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">{t.domainInfo.updated}:</span>
                <span>{formatDate(data.updateDate)}</span>
            </div>
        </div>
      </InfoCard>

      <InfoCard title={t.domainInfo.registrar} icon={Building2}>
         <div className="text-2xl font-bold truncate" title={data.registrar}>{data.registrar || t.domainInfo.unknown}</div>
         {data.registrarIANAID && <p className="text-xs text-muted-foreground">{t.domainInfo.ianaId}: {data.registrarIANAID}</p>}
         {data.whoisServer && (
             <div className="mt-2 pt-2 border-t text-xs text-muted-foreground flex justify-between">
                 <span>{t.domainInfo.whoisServer}:</span>
                 <span className="font-mono">{data.whoisServer}</span>
             </div>
         )}
      </InfoCard>

      <InfoCard title={t.domainInfo.serverInfo} icon={HardDrive}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">{t.domainInfo.domainIp}:</span>
                <span className="font-mono">{data.serverIp || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">{t.domainInfo.location}:</span>
                <span className="text-right truncate max-w-[150px]" title={data.serverLocation}>{data.serverLocation || 'N/A'}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">{t.domainInfo.isp}:</span>
                <span className="text-right truncate max-w-[150px]" title={data.serverIsp}>{data.serverIsp || 'N/A'}</span>
            </div>
          </div>
      </InfoCard>

      <InfoCard title={t.domainInfo.nameservers} icon={Server} className="col-span-1 md:col-span-2 lg:col-span-2">
         <div className="grid gap-2 sm:grid-cols-2">
            {data.nameservers.map(ns => (
                <div key={ns} className="flex items-center space-x-2 text-sm">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span>{ns}</span>
                </div>
            ))}
         </div>
      </InfoCard>
      
      {/* Raw Data Section */}
      <div className="col-span-full">
        <InfoCard title={t.domainInfo.rawData} icon={FileText}>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                        {t.domainInfo.source}: <span className="font-medium text-foreground">{data.source}</span>
                    </span>
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowRaw(!showRaw)}
                    >
                        {showRaw ? t.domainInfo.hideRaw : t.domainInfo.showRaw}
                    </Button>
                </div>
                
                {showRaw && (
                    <div className="mt-4 relative group">
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleCopy}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <div className="rounded-md bg-muted p-4 overflow-x-auto">
                            <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                                {data.rawText || JSON.stringify(data.raw, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </InfoCard>
      </div>
      
      <div className="col-span-full text-center text-xs text-muted-foreground mt-4">
        {t.domainInfo.dataSource}: {data.source} {data.whoisServer ? `${t.domainInfo.via} ${data.whoisServer}` : ''}
      </div>
    </div>
  );
}
