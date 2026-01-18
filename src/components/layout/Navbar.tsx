'use client';

import { useTranslations } from 'next-intl';
import * as routing from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';

const { Link, usePathname } = routing;

export function Navbar() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: tNav('home') },
    { href: '/gallery', label: tNav('gallery') },
    { href: '/locations', label: tNav('locations') },
    { href: '/pricing', label: tNav('pricing') },
    { href: '/packages', label: tNav('packages') },
    { href: '/contact', label: tNav('contact') },
  ];

  const defaultMessage = 'Здравствуйте! Хочу заказать виньетки/альбомы в Алматы.';
  const whatsappUrl = getWhatsAppUrl(defaultMessage);

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg border-b border-brand-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icons/logo.svg" alt="Beine logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-brand-accent">
              {tCommon('appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-brand-text hover:text-brand-accent transition-colors',
                  pathname === item.href && 'text-brand-accent font-semibold'
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-brand-border">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>

              <a
                href={getTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
            </div>

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>

              <a
                href={getTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
            </div>

            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-text"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-brand-text hover:text-brand-accent transition-colors',
                  pathname === item.href && 'text-brand-accent font-semibold'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
