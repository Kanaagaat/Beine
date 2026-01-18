export interface Location {
  id: string; // Must match pricingConfig LOCATIONS_PRICES keys
  nameRu: string;
  nameKk: string;
  imagePath?: string;
  isActive: boolean;
  sortOrder: number;
  featuresRu: string[];
  featuresKk: string[];
}

export const locations: Location[] = [
  {
    id: 'park',
    nameRu: 'Парк',
    nameKk: 'Парк',
    imagePath: '/locations/park.jpg',
    isActive: true,
    sortOrder: 1,
    featuresRu: ['TODO: Опишите особенности парка'],
    featuresKk: ['TODO: Парктың ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'dune',
    nameRu: 'Дюна',
    nameKk: 'Құм төбесі',
    imagePath: '/locations/dune.jpg',
    isActive: true,
    sortOrder: 2,
    featuresRu: ['TODO: Опишите особенности дюны'],
    featuresKk: ['TODO: Құм төбесінің ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'studio',
    nameRu: 'Студия',
    nameKk: 'Студия',
    imagePath: '/locations/studio.jpg',
    isActive: true,
    sortOrder: 3,
    featuresRu: [
      'Профессиональное оборудование',
      'Контролируемое освещение',
      'Различные фоны',
      'Климат-контроль',
    ],
    featuresKk: [
      'Кәсіби жабдық',
      'Басқарылатын жарық',
      'Түрлі фондар',
      'Климат-контроль',
    ],
  },
  {
    id: 'restaurant',
    nameRu: 'Ресторан',
    nameKk: 'Ресторан',
    imagePath: '/locations/restaurant.jpg',
    isActive: true,
    sortOrder: 4,
    featuresRu: ['TODO: Опишите особенности ресторана'],
    featuresKk: ['TODO: Ресторанның ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'hippodrome',
    nameRu: 'Ипподром',
    nameKk: 'Атты спорт стадиону',
    imagePath: '/locations/hippodrome.jpg',
    isActive: true,
    sortOrder: 5,
    featuresRu: ['TODO: Опишите особенности ипподрома'],
    featuresKk: ['TODO: Ипподромның ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'forsage',
    nameRu: 'Форсаж',
    nameKk: 'Форсаж',
    imagePath: '/locations/forsage.jpg',
    isActive: true,
    sortOrder: 6,
    featuresRu: ['TODO: Опишите особенности Форсажа'],
    featuresKk: ['TODO: Форсаждың ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'jetCabin',
    nameRu: 'Jet Cabin',
    nameKk: 'Jet Cabin',
    imagePath: '/locations/jet-cabin.jpg',
    isActive: true,
    sortOrder: 7,
    featuresRu: ['TODO: Опишите особенности Jet Cabin'],
    featuresKk: ['TODO: Jet Cabinның ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'tennis',
    nameRu: 'Теннис',
    nameKk: 'Теннис',
    imagePath: '/locations/tennis.jpg',
    isActive: true,
    sortOrder: 8,
    featuresRu: ['TODO: Опишите особенности теннисного корта'],
    featuresKk: ['TODO: Теннис корытының ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'aerodrome',
    nameRu: 'Аэродром',
    nameKk: 'Әуебазасы',
    imagePath: '/locations/aerodrome.jpg',
    isActive: true,
    sortOrder: 9,
    featuresRu: ['TODO: Опишите особенности аэродрома'],
    featuresKk: ['TODO: Әуебазасының ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'checkersOnSaina',
    nameRu: 'Шашки на Сайн',
    nameKk: 'Сайында Шашка',
    imagePath: '/locations/checkers-on-saina.jpg',
    isActive: true,
    sortOrder: 10,
    featuresRu: ['TODO: Опишите особенности локации'],
    featuresKk: ['TODO: Орындықтың ерекшеліктерін сипаттаңыз'],
  },
  {
    id: 'helicopter',
    nameRu: 'Вертолёт',
    nameKk: 'Вертолёт',
    imagePath: '/locations/helicopter.jpg',
    isActive: false,
    sortOrder: 11,
    featuresRu: ['По запросу'],
    featuresKk: ['Сұрау бойынша'],
  },
];

export function getActiveLocations(): Location[] {
  return locations.filter((loc) => loc.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLocationById(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}
