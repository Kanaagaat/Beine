'use client';

import { useTranslations } from 'next-intl';
import * as routing from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getWhatsAppUrlForAruzhan, getWhatsAppUrlForDina } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

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
  const whatsappUrlAruzhan = getWhatsAppUrlForAruzhan(defaultMessage);
  const whatsappUrlDina = getWhatsAppUrlForDina(defaultMessage);

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg border-b border-brand-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icons/newlog.svg" alt="Beine logo" className="h-8 w-8" />
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
              {/* Desktop WhatsApp Button - Aruzhan */}
              <a
                href={whatsappUrlAruzhan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp - Aružan"
                title="Aružan"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Aružan</span>
              </a>

              {/* Desktop WhatsApp Button - Dina */}
              <a
                href={whatsappUrlDina}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp - Dina"
                title="Dina"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Dina</span>
              </a>
            </div>

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile WhatsApp Icon Button - Aruzhan */}
            <a
              href={whatsappUrlAruzhan}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              aria-label="WhatsApp - Aružan"
              title="Aružan"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>

            {/* Mobile WhatsApp Icon Button - Dina */}
            <a
              href={whatsappUrlDina}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              aria-label="WhatsApp - Dina"
              title="Dina"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>

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
