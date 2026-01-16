'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  calculatePrice,
  getAvailablePages,
  getAddonPrice,
  type PricingInput,
  type PricingResult,
} from '@/config/pricing';
import { formatKZT } from '@/lib/formatters';
import { type Location } from '@/data/locations';
import { buildInquiryMessage, getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';

interface PricingCalculatorProps {
  locations: Location[];
}

export function PricingCalculator({ locations }: PricingCalculatorProps) {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'ru' | 'kk';
  const [students, setStudents] = useState<number>(25);
  const [pages, setPages] = useState<number>(4);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [addons, setAddons] = useState<Record<string, boolean>>({
    premiumCover: false,
    urgent: false,
    delivery: false,
  });
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  useEffect(() => {
    if (selectedLocationIds.length > 0 && students > 0 && pages > 0) {
      // Sum fees from all selected locations
      const locationFee = selectedLocationIds.reduce((sum, locId) => {
        const location = locations.find((l) => l.id === locId);
        return sum + (location?.fee || 0);
      }, 0);

      const addonList = Object.entries(addons)
        .filter(([_, enabled]) => enabled)
        .map(([type, _]) => ({
          type: type as 'premiumCover' | 'urgent' | 'delivery',
          price: getAddonPrice(type),
        }));

      const input: PricingInput = {
        students,
        pages,
        locationFee,
        addons: addonList,
      };

      const result = calculatePrice(input);
      setPricing(result);
    } else {
      setPricing(null);
    }
  }, [students, pages, selectedLocationIds, addons, locations]);

  const handleContact = () => {
    if (!pricing || selectedLocationIds.length === 0) return;

    const selectedLocations = selectedLocationIds
      .map(id => {
        const loc = locations.find(l => l.id === id);
        return locale === 'ru' ? loc?.nameRu : loc?.nameKk;
      })
      .filter(Boolean)
      .join(', ');

    const message = buildInquiryMessage(
      {
        students,
        pages,
        locationId: selectedLocationIds[0],
        total: pricing.total,
        selectedLocations,
      },
      locale
    );

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const pageOptions = getAvailablePages();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <label className="label">
                {t('students.label')}
              </label>
              <input
                type="number"
                min="1"
                value={students}
                onChange={(e) => setStudents(parseInt(e.target.value) || 0)}
                className="input"
                placeholder={t('students.placeholder')}
              />
            </Card>

            <Card>
              <label className="label">
                {t('pages.label')}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {pageOptions.map((pageCount) => (
                  <button
                    key={pageCount}
                    onClick={() => setPages(pageCount)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      pages === pageCount
                        ? 'border-brand-accent bg-brand-accent text-white'
                        : 'border-brand-border hover:border-brand-accent'
                    }`}
                  >
                    {pageCount}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <label className="label">
                {t('location.label')}
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="input w-full text-left flex items-center justify-between"
                >
                  <span>
                    {selectedLocationIds.length === 0
                      ? t('location.label')
                      : `${selectedLocationIds.length} ${locale === 'ru' ? 'локация' : 'локация'} выбрано`}
                  </span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-lg shadow-lg z-10">
                    {locations
                      .filter((l) => l.isActive)
                      .map((location) => (
                        <label
                          key={location.id}
                          className="flex items-center px-4 py-2 hover:bg-brand-surface cursor-pointer border-b border-brand-border last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLocationIds.includes(location.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLocationIds([...selectedLocationIds, location.id]);
                              } else {
                                setSelectedLocationIds(selectedLocationIds.filter(id => id !== location.id));
                              }
                            }}
                            className="w-4 h-4 rounded"
                          />
                          <span className="ml-3 flex-1">
                            {locale === 'ru' ? location.nameRu : location.nameKk}
                          </span>
                          <span className="text-brand-muted text-sm">
                            {formatKZT(location.fee)}
                          </span>
                        </label>
                      ))}
                  </div>
                )}
              </div>
              {selectedLocationIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedLocationIds.map(id => {
                    const loc = locations.find(l => l.id === id);
                    return (
                      <div
                        key={id}
                        className="inline-flex items-center gap-2 bg-brand-surface px-3 py-1 rounded-full text-sm"
                      >
                        <span>{locale === 'ru' ? loc?.nameRu : loc?.nameKk}</span>
                        <button
                          onClick={() => setSelectedLocationIds(selectedLocationIds.filter(locId => locId !== id))}
                          className="text-brand-muted hover:text-brand-accent"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">
                {t('addons.title')}
              </h3>
              <div className="space-y-3">
                {Object.entries(addons).map(([type, enabled]) => {
                  const price = getAddonPrice(type);
                  const addonLabel = t(`addons.${type}`);
                  return (
                    <label key={type} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) =>
                            setAddons({ ...addons, [type]: e.target.checked })
                          }
                          className="w-5 h-5 text-brand-accent rounded focus:ring-brand-accent"
                        />
                        <span className="ml-2">{addonLabel}</span>
                      </div>
                      {price > 0 && (
                        <span className="text-gray-600">{formatKZT(price)}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6">
                {t('summary.title')}
              </h2>

              {pricing ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {t('summary.pricePerStudent')}:
                      </span>
                      <span className="font-semibold">
                        {formatKZT(pricing.pricePerStudent)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">
                        {t('summary.totalPrice')}:
                      </span>
                      <span className="font-bold text-brand-accent text-xl">
                        {formatKZT(pricing.total)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">
                      {t('summary.included')}:
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {t.raw('summary.includedItems').map((item: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-brand-accent mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleContact}
                      disabled={selectedLocationIds.length === 0 || students <= 0}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {tCommon('whatsapp')}
                    </Button>
                    <a
                      href={getTelegramUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center justify-center gap-2"
                        disabled={selectedLocationIds.length === 0 || students <= 0}
                      >
                        <TelegramIcon className="h-5 w-5" />
                        {tCommon('telegram')}
                      </Button>
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {locale === 'ru' 
                    ? 'Заполните форму для расчета стоимости'
                    : 'Бағаны есептеу үшін форманы толтырыңыз'}
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
