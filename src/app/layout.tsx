import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Выпускные виньетки и фотоальбомы в Алматы — фотостудия Beine',
  description: 'Профессиональные виньетки и фотоальбомы выпускников в Алматы. Студийная фотосъёмка, локации, доставка альбомов, лимузин и бесплатные ЕНТ курсы.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
