'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'ru' | 'kk';

  // Simple default message
  const defaultMessage = locale === 'ru'
    ? 'Здравствуйте! Хочу заказать виньетки/альбомы в Алматы.'
    : 'Сәлеметсіз бе! Алматыда виньетка/альбомға тапсырыс бергім келеді.';

  const whatsappUrl = getWhatsAppUrl(defaultMessage);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        <Card>
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-700 mb-8">
              {locale === 'ru'
                ? 'Свяжитесь с нами через WhatsApp или Telegram для заказа виньеток и альбомов.'
                : 'Винеткалар мен альбомдарға тапсырыс беру үшін WhatsApp немесе Telegram арқылы бізбен байланысыңыз.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {tCommon('whatsapp')}
                </Button>
              </a>
              <a
                href={getTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <TelegramIcon className="h-5 w-5" />
                  {tCommon('telegram')}
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
