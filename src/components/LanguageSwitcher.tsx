"use client"

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Locale } from '@/lib/i18n/dictionaries';

export function LanguageSwitcher() {
  const { mode, setMode, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options: { value: Locale; label: string }[] = [
    { value: 'auto', label: 'Auto' },
    { value: 'en', label: 'English' },
    { value: 'zh', label: '中文' },
  ];

  const currentLabel = options.find(o => o.value === mode)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLabel}</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                mode === option.value && "bg-accent text-accent-foreground"
              )}
              onClick={() => {
                setMode(option.value);
                setIsOpen(false);
              }}
            >
              <span className="flex-1">{option.label}</span>
              {mode === option.value && <Check className="h-3 w-3" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
