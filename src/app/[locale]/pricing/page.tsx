import type { Metadata } from 'next';
import { getActiveLocations } from '@/data/locations';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';

export const metadata: Metadata = {
  title: 'Цены на профессиональные фотоальбомы выпускников в Алматы',
  description: 'Калькулятор стоимости выпускных виньеток и альбомов. Пакеты для школ: мини, стандарт, премиум. Фотостудия для выпускных классов в Алматы.',
  openGraph: {
    title: 'Цены на виньетки и фотоальбомы для выпускников в Алматы',
    description: 'Профессиональные фотоальбомы, студийная фотосъёмка, локации, доставка. Три пакета на выбор.',
  },
};

export default function PricingPage() {
  const locations = getActiveLocations();

  return <PricingCalculator locations={locations} />;
}
