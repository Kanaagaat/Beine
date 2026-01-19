'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { type Location } from '@/data/locations';

interface LocationsListProps {
  locations: Location[];
}

export function LocationsList({ locations }: LocationsListProps) {
  const t = useTranslations('locations');
  const locale = useLocale() as 'ru' | 'kk';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations
            .filter((l) => l.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((location) => (
              <Card key={location.id} className="overflow-hidden">
                {location.imagePath && (
                  <img
                    src={location.imagePath}
                    alt={locale === 'ru' ? location.nameRu : location.nameKk}
                    // CHANGED: 
                    // 1. object-cover: Fills the whole box (no empty space)
                    // 2. object-center: Keeps the middle of the image visible
                    className="w-full aspect-[454/256] object-cover object-center mb-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'ru' ? location.nameRu : location.nameKk}
                </h3>
                <div>
                  <p className="text-sm font-medium text-brand-muted mb-2">
                    {t('features')}
                  </p>
                  <ul className="text-sm space-y-1">
                    {(locale === 'ru' ? location.featuresRu : location.featuresKk).map(
                      (feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-accent mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
