'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';

export function Footer() {
  const t = useTranslations('common');
  const defaultMessage = 'Здравствуйте! Хочу заказать виньетки/альбомы в Алматы.';
  const whatsappUrl = getWhatsAppUrl(defaultMessage);

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('appName')}
            </h3>
            <p className="text-gray-400">
              Виньетки и выпускные альбомы для классов в Алматы
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Галерея
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p className="text-gray-400 mb-4">
              Алматы, Казахстан
            </p>
            <div className="flex gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t('whatsapp')}</span>
              </a>
              <a
                href={getTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <TelegramIcon className="h-5 w-5" />
                <span>{t('telegram')}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('appName')}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
