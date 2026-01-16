'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('ru')}
        className={locale === 'ru' ? 'font-semibold text-accent' : 'text-gray-600 hover:text-accent'}
        aria-label="Switch to Russian"
      >
        RU
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale('kk')}
        className={locale === 'kk' ? 'font-semibold text-accent' : 'text-gray-600 hover:text-accent'}
        aria-label="Switch to Kazakh"
      >
        KK
      </button>
    </div>
  );
}
