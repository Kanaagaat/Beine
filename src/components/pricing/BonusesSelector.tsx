'use client';

import { useTranslations } from 'next-intl';
import { BONUSES } from '@/config/pricingConfig';
import { Card } from '@/components/ui/Card';

interface BonusesSelectorProps {
  selectedBonuses: string[];
  onSelectionChange: (selected: string[]) => void;
}

export function BonusesSelector({ selectedBonuses, onSelectionChange }: BonusesSelectorProps) {
  const t = useTranslations('pricing');

  const handleToggle = (bonusText: string) => {
    const isSelected = selectedBonuses.includes(bonusText);

    if (isSelected) {
      // Remove if already selected
      onSelectionChange(selectedBonuses.filter((b) => b !== bonusText));
    } else {
      // Add if not selected and we haven't reached max 2
      if (selectedBonuses.length < 2) {
        onSelectionChange([...selectedBonuses, bonusText]);
      }
    }
  };

  const isMaxSelected = selectedBonuses.length >= 2;

  return (
    <Card>
      <label className="label">{t('bonuses.label')}</label>
      <p className="text-sm text-brand-muted mb-4">{t('bonuses.maxSelection')}</p>

      <div className="space-y-2">
        {BONUSES.map((bonus) => {
          const isSelected = selectedBonuses.includes(bonus);
          const isDisabled = isMaxSelected && !isSelected;

          return (
            <button
              key={bonus}
              type="button"
              onClick={() => handleToggle(bonus)}
              disabled={isDisabled}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed border-brand-border bg-gray-50'
                  : isSelected
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
              <span className={`flex-1 font-medium ${isDisabled ? 'text-gray-500' : ''}`}>
                {bonus}
              </span>
            </button>
          );
        })}
      </div>

      {isMaxSelected && (
        <p className="mt-4 text-sm text-brand-accent">{t('bonuses.selectedCount')}</p>
      )}
    </Card>
  );
}
