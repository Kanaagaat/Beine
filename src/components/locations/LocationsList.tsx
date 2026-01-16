'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { formatKZT } from '@/lib/formatters';
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
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden">
              {location.imageUrl && (
                <img
                  src={location.imageUrl}
                  alt={locale === 'ru' ? location.nameRu : location.nameKk}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'ru' ? location.nameRu : location.nameKk}
              </h3>
              {location.addressRu && (
                <p className="text-gray-600 mb-2 text-sm">
                  {t('address')}: {locale === 'ru' ? location.addressRu : location.addressKk}
                </p>
              )}
              <p className="text-lg font-semibold text-brand-accent">
                {t('fee')}: {formatKZT(location.fee)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
