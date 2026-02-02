'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  calculatePricing,
  PAGES_OPTIONS,
  ADDONS_PRICES,
  FREE_COPIES,
  type PageCount,
  type PricingResult,
} from '@/config/pricingConfig';
import { formatKZT } from '@/lib/formatters';
import { type Location } from '@/data/locations';
import { buildInquiryMessage, getWhatsAppUrl, getTelegramUrl } from '@/lib/messaging';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { TelegramIcon } from '@/components/ui/TelegramIcon';
import { BonusesSelector } from './BonusesSelector';

interface PricingCalculatorProps {
  locations: Location[];
}

export function PricingCalculator({ locations }: PricingCalculatorProps) {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'ru' | 'kk';

  // Form state
  const [students, setStudents] = useState<number | ''>(25);
  const [pages, setPages] = useState<PageCount>(4);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    delivery: false,
    urgent: false,
    limousine: false,
    ribbon: false,
  });
  const [selectedBonuses, setSelectedBonuses] = useState<string[]>([]);

  // UI state
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const studentsNumber = students === '' ? 0 : students;

  // Recalculate pricing whenever inputs change
  useEffect(() => {
    if (selectedLocationIds.length > 0 && studentsNumber > 0) {
      const result = calculatePricing({
        studentsTotal: studentsNumber,
        pages,
        locationIds: selectedLocationIds,
        addons: selectedAddons,
      });

      setPricing(result);
    } else {
      setPricing(null);
    }
  }, [studentsNumber, pages, selectedLocationIds, selectedAddons]);

  const handleContact = (method: 'whatsapp' | 'telegram') => {
    if (!pricing || !pricing.isValid || selectedLocationIds.length === 0 || studentsNumber <= 0) {
      return;
    }

    const selectedLocationsNames = selectedLocationIds
      .map((id) => {
        const loc = locations.find((l) => l.id === id);
        return locale === 'ru' ? loc?.nameRu : loc?.nameKk;
      })
      .filter(Boolean)
      .join(', ');

    const selectedAddonsNames = Object.entries(selectedAddons)
      .filter(([, enabled]) => enabled)
      .map(([key]) => {
        const name = locale === 'ru' 
          ? t(`addons.${key}.label`)
          : t(`addons.${key}.label`);
        return name;
      })
      .filter(Boolean)
      .join(', ');

    const message = buildInquiryMessage(
      {
        students: studentsNumber,
        paidCount: pricing.paidCount,
        pages,
        locations: selectedLocationsNames,
        addons: selectedAddonsNames,
        bonuses: selectedBonuses.join(', '),
        pricePerStudent: pricing.pricePerStudent,
        totalCost: pricing.totalCost,
      },
      locale
    );

    if (method === 'whatsapp') {
      window.open(getWhatsAppUrl(message), '_blank');
    } else {
      window.open(getTelegramUrl(message), '_blank');
    }
  };

  const isFormValid = selectedLocationIds.length > 0 && studentsNumber > 0 && pricing?.isValid;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Students Input */}
            <Card>
              <label className="label">{t('students.label')}</label>
              <input
                type="number"
                min="1"
                value={students}
                onChange={(e) => {
                  const v = e.target.value;
                  setStudents(v === '' ? '' : Number(v));
                }}
                className="input"
                placeholder={t('students.placeholder')}
              />
              {studentsNumber > 0 && (
                <p className="mt-2 text-sm text-brand-muted">
                  {t('students.paid')}: {studentsNumber - FREE_COPIES}
                </p>
              )}
            </Card>

            {/* Pages Selection */}
            <Card>
              <label className="label">{t('pages.label')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PAGES_OPTIONS.map((pageCount) => (
                  <button
                    key={pageCount}
                    onClick={() => setPages(pageCount as PageCount)}
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

            {/* Location Selection */}
            <Card>
              <label className="label">{t('location.label')}</label>
              <div className="relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="input w-full text-left flex items-center justify-between"
                  type="button"
                >
                  <span>
                    {selectedLocationIds.length === 0
                      ? t('location.selectPlaceholder')
                      : `${selectedLocationIds.length} ${t('location.selected')}`}
                  </span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={showLocationDropdown ? 'M19 14l-7-7m0 0L5 14m7-7v12' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
                    />
                  </svg>
                </button>

                {showLocationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {locations
                      .filter((l) => l.isActive)
                      .map((location) => (
                        <label
                          key={location.id}
                          className="flex items-center px-4 py-3 hover:bg-brand-surface cursor-pointer border-b border-brand-border last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLocationIds.includes(location.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLocationIds([...selectedLocationIds, location.id]);
                              } else {
                                setSelectedLocationIds(
                                  selectedLocationIds.filter((id) => id !== location.id)
                                );
                              }
                            }}
                            className="w-4 h-4 rounded text-brand-accent"
                          />
                          <span className="ml-3 flex-1 font-medium">
                            {locale === 'ru' ? location.nameRu : location.nameKk}
                          </span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {selectedLocationIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedLocationIds.map((id) => {
                    const loc = locations.find((l) => l.id === id);
                    return (
                      <div
                        key={id}
                        className="inline-flex items-center gap-2 bg-brand-surface px-3 py-1 rounded-full text-sm"
                      >
                        <span>{locale === 'ru' ? loc?.nameRu : loc?.nameKk}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedLocationIds(selectedLocationIds.filter((locId) => locId !== id))
                          }
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

            {/* Add-ons Selection */}
            <Card>
              <label className="label">{t('addons.title')}</label>
              <div className="space-y-3">
                {Object.entries(ADDONS_PRICES).map(([key, price]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between cursor-pointer p-3 border border-brand-border rounded-lg hover:bg-brand-surface transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        checked={selectedAddons[key] || false}
                        onChange={(e) => {
                          setSelectedAddons({
                            ...selectedAddons,
                            [key]: e.target.checked,
                          });
                        }}
                        className="w-5 h-5 text-brand-accent rounded focus:ring-brand-accent"
                      />
                      <span className="ml-3 font-medium">
                        {t(`addons.${key}.label`)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Bonuses Selector */}
            <BonusesSelector
              selectedBonuses={selectedBonuses}
              onSelectionChange={setSelectedBonuses}
            />
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6">{t('summary.title')}</h2>

              {pricing && pricing.isValid ? (
                <>
                  {/* Main price display */}
                  <div className="mb-8 p-4 bg-brand-surface rounded-lg border-2 border-brand-accent">
                    <p className="text-sm text-brand-muted mb-1">{t('summary.pricePerStudent')}</p>
                    <p className="text-3xl font-bold text-brand-accent mb-4">
                      {formatKZT(pricing.pricePerStudent)}
                    </p>
                    <p className="text-sm text-brand-muted mb-1">{t('summary.totalPrice')}</p>
                    <p className="text-2xl font-bold text-brand-text">{formatKZT(pricing.totalCost)}</p>
                  </div>

                  {/* Contact buttons */}
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleContact('whatsapp')}
                      disabled={!pricing.isValid}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {tCommon('whatsapp')}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleContact('telegram')}
                      disabled={!pricing.isValid}
                    >
                      <TelegramIcon className="h-5 w-5" />
                      {tCommon('telegram')}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-brand-muted text-center py-8">{t('summary.waitingForInput')}</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
