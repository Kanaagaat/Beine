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

      <div className="space-y-3">
        {BONUSES.map((bonus) => {
          const isSelected = selectedBonuses.includes(bonus);
          const isDisabled = isMaxSelected && !isSelected;

          return (
            <label
              key={bonus}
              className={`flex items-center p-3 border border-brand-border rounded-lg cursor-pointer transition-colors ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed bg-gray-50'
                  : isSelected
                    ? 'bg-brand-surface border-brand-accent'
                    : 'hover:bg-brand-surface'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(bonus)}
                disabled={isDisabled}
                className="w-5 h-5 text-brand-accent rounded focus:ring-brand-accent disabled:opacity-50"
              />
              <span className={`ml-3 font-medium ${isDisabled ? 'text-gray-500' : ''}`}>
                {bonus}
              </span>
            </label>
          );
        })}
      </div>

      {isMaxSelected && (
        <p className="mt-4 text-sm text-brand-accent">{t('bonuses.selectedCount')}</p>
      )}
    </Card>
  );
}
