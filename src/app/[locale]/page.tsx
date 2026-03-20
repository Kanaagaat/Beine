import type { Metadata } from 'next';
import { HomePageClient } from '@/components/home/HomePageClient';

export const metadata: Metadata = {
  title: 'Выпускные виньетки и фотоальбомы в Алматы — Beine',
  description: 'Профессиональная фотостудия в Алматы. Виньетки, фотоальбомы выпускников, студийная фотосъёмка на локациях. Лимузин, развозка, индивидуальные фото и электронный формат.',
  openGraph: {
    title: 'Выпускные виньетки и фотоальбомы в Алматы — Beine',
    description: 'Фотостудия в Алматы. Профессиональные альбомы для выпускников. Локации, доставка, бонусы, бесплатные ЕНТ курсы.',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
