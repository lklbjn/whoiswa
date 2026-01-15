"use client"

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between items-center w-full">
        <Link href="/" className="font-bold text-xl">{t.brand.name}</Link>
        <div className="flex items-center gap-4">
            <LanguageSwitcher />
        </div>
    </div>
  );
}
