'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { servicePackages } from '@/data/packages';
import { getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';
import { formatKZT } from '@/lib/formatters';

export default function PackagesPage() {
  const t = useTranslations('packages');
  const tCommon = useTranslations('common');

  const handleContact = () => {
    const message = t('contactMessage');
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-brand-muted">{t('subtitle')}</p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {servicePackages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col ${pkg.id === 'premium' ? 'ring-2 ring-brand-accent lg:scale-105' : ''}`}>
              {pkg.id === 'premium' && (
                <div className="mb-4 inline-block bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {t('popular')}
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{pkg.nameRu}</h2>
              <p className="text-sm text-brand-muted mb-4">{pkg.nameKk}</p>

              <p className="text-lg font-semibold text-brand-accent mb-6">
                {t('priceLabel')}: {formatKZT(pkg.priceKzt)}
              </p>

              {/* Included items */}
              <div className="flex-1 mb-6">
                <h3 className="font-semibold mb-3">{t('included')}</h3>
                <ul className="space-y-2">
                  {pkg.includedRu.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-brand-accent font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.notesRu && (
                <p className="text-sm text-brand-muted mb-6 p-3 bg-brand-surface rounded italic">
                  {pkg.notesRu}
                </p>
              )}

              <Button
                variant={pkg.id === 'premium' ? 'primary' : 'outline'}
                className="w-full"
                onClick={handleContact}
              >
                {tCommon('contact')}
              </Button>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">{t('comparison')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-surface">
                  <th className="border border-brand-border p-4 text-left font-semibold">{t('feature')}</th>
                  {servicePackages.map((pkg) => (
                    <th key={pkg.id} className="border border-brand-border p-4 text-center font-semibold">
                      {pkg.nameRu}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Photography Duration */}
                <tr>
                  <td className="border border-brand-border p-4 font-medium">{t('photographyDuration')}</td>
                  <td className="border border-brand-border p-4 text-center">2 ч</td>
                  <td className="border border-brand-border p-4 text-center">3 ч</td>
                  <td className="border border-brand-border p-4 text-center">{t('fullDay')}</td>
                </tr>
                {/* Locations */}
                <tr className="bg-brand-surface">
                  <td className="border border-brand-border p-4 font-medium">{t('locations')}</td>
                  <td className="border border-brand-border p-4 text-center">1</td>
                  <td className="border border-brand-border p-4 text-center">Многие</td>
                  <td className="border border-brand-border p-4 text-center">Все</td>
                </tr>
                {/* Pages */}
                <tr>
                  <td className="border border-brand-border p-4 font-medium">{t('pages')}</td>
                  <td className="border border-brand-border p-4 text-center">4</td>
                  <td className="border border-brand-border p-4 text-center">6</td>
                  <td className="border border-brand-border p-4 text-center">8</td>
                </tr>
                {/* Individual Photos */}
                <tr>
                  <td className="border border-brand-border p-4 font-medium">{t('individualPhotos')}</td>
                  <td className="border border-brand-border p-4 text-center">-</td>
                  <td className="border border-brand-border p-4 text-center">✓</td>
                  <td className="border border-brand-border p-4 text-center">✓</td>
                </tr>
                {/* Electronic Format */}
                <tr className="bg-brand-surface">
                  <td className="border border-brand-border p-4 font-medium">{t('electronicFormat')}</td>
                  <td className="border border-brand-border p-4 text-center">-</td>
                  <td className="border border-brand-border p-4 text-center">✓</td>
                  <td className="border border-brand-border p-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-surface rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('choosePackage')}</h2>
          <p className="text-brand-muted mb-8">{t('contactUsForQuote')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
              onClick={() => window.open(getWhatsAppUrl(t('contactMessage')), '_blank')}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {tCommon('whatsapp')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              onClick={() => window.open(getTelegramUrl(), '_blank')}
            >
              <TelegramIcon className="h-5 w-5" />
              {tCommon('telegram')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
