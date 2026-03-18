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
  COVER_TYPES,
  COVER_FINISHES,
  type PageCount,
  type PricingResult,
  type CoverTypeId,
  type CoverFinishId,
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
  const [coverTypeId, setCoverTypeId] = useState<CoverTypeId>('hard_classic');
  const [coverFinishId, setCoverFinishId] = useState<CoverFinishId>('matte');
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    delivery: false,
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
        coverTypeId,
        coverFinishId,
      });

      setPricing(result);
    } else {
      setPricing(null);
    }
  }, [studentsNumber, pages, selectedLocationIds, selectedAddons, coverTypeId, coverFinishId]);

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

    // Get cover type label
    const coverTypeKey = coverTypeId === 'hard_classic' ? 'hardClassic' : 'comboCover';
    const coverTypeLabel = t(`cover.${coverTypeKey}`);

    // Get cover finish label
    const finishKeyMap: Record<string, string> = {
      matte: 'matte',
      glossy: 'glossy',
      eco_leather: 'ecoLeather',
      diamond: 'diamond',
    };
    const finishKey = finishKeyMap[coverFinishId] || 'matte';
    const coverFinishLabel = t(`coverFinish.${finishKey}`);

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
        coverType: coverTypeLabel,
        coverFinish: coverFinishLabel,
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
              {studentsNumber > 0}
            </Card>

            {/* Pages Selection */}
            <Card>
              <label className="label">
                {t('pages.label')}
                <span className="ml-1 text-gray-400 opacity-60">{t('pages.hint')}</span>
              </label>
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

            {/* Cover Type Selection */}
            <Card>
              <h3 className="label mb-3">{t('cover.label')}</h3>
              <div className="space-y-2">
                {COVER_TYPES.map((cover) => (
                  <label
                    key={cover.id}
                    className="flex items-center gap-3 cursor-pointer p-3 border border-brand-border rounded-lg hover:bg-brand-surface transition-colors"
                  >
                    <input
                      type="radio"
                      name="coverType"
                      value={cover.id}
                      checked={coverTypeId === cover.id}
                      onChange={() => setCoverTypeId(cover.id)}
                      className="w-4 h-4 accent-brand-accent"
                    />
                    <span className="font-medium">
                      {t(`cover.${cover.id === 'hard_classic' ? 'hardClassic' : 'comboCover'}`)}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Cover Finish Selection */}
            <Card>
              <label className="label">{t('coverFinish.label')}</label>
              <select
                value={coverFinishId}
                onChange={(e) => setCoverFinishId(e.target.value as CoverFinishId)}
                className="input w-full"
              >
                {COVER_FINISHES.map((finish) => {
                  const finishKeyMap: Record<string, string> = {
                    matte: 'matte',
                    glossy: 'glossy',
                    eco_leather: 'ecoLeather',
                    diamond: 'diamond',
                  };
                  const key = finishKeyMap[finish.id];
                  return (
                    <option key={finish.id} value={finish.id}>
                      {t(`coverFinish.${key}`)}
                    </option>
                  );
                })}
              </select>
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
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto p-2 space-y-2">
                    {locations
                      .filter((l) => l.isActive)
                      .map((location) => {
                        const isSelected = selectedLocationIds.includes(location.id);
                        return (
                          <button
                            key={location.id}
                            type="button"
                            onClick={() => {
                              setSelectedLocationIds(
                                isSelected
                                  ? selectedLocationIds.filter((id) => id !== location.id)
                                  : [...selectedLocationIds, location.id]
                              );
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                              isSelected
                                ? 'border-brand-accent bg-brand-accent/10'
                                : 'border-brand-border hover:border-brand-accent/60'
                            }`}
                          >
                            <span
                              className={`inline-flex h-4 w-4 items-center justify-center rounded-full border flex-shrink-0 ${
                                isSelected
                                  ? 'border-brand-accent bg-brand-accent'
                                  : 'border-brand-border bg-white'
                              }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                            <span className="flex-1 font-medium">
                              {locale === 'ru' ? location.nameRu : location.nameKk}
                            </span>
                          </button>
                        );
                      })}
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
              <div className="space-y-2">
                {Object.entries(ADDONS_PRICES).map(([key, price]) => {
                  const isSelected = selectedAddons[key] || false;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedAddons({
                          ...selectedAddons,
                          [key]: !isSelected,
                        });
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? 'border-brand-accent bg-brand-accent/10'
                          : 'border-brand-border hover:border-brand-accent/60'
                      }`}
                    >
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border flex-shrink-0 ${
                          isSelected
                            ? 'border-brand-accent bg-brand-accent'
                            : 'border-brand-border bg-white'
                        }`}
                      >
                        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="flex-1 font-medium">
                        {t(`addons.${key}.label`)}
                      </span>
                    </button>
                  );
                })}
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
