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
    nameRu: 'Природа',
    nameKk: 'Табиғат',
    imagePath: '/locations/10.jpg',
    isActive: true,
    sortOrder: 1,
    featuresRu: ['свободный образ',
                  'съемка в стиле picnic',
                  'бэкстейдж',
                  'горы'],
    featuresKk: ['еркін сурет',
                  'picnic стиліндегі түсірілім',
                  'backstage',
                  'таулар']
  },
  {
    id: 'dune',
    nameRu: 'Дюна',
    nameKk: 'Құм төбесі',
    imagePath: '/locations/6.jpg',
    isActive: true,
    sortOrder: 2,
    featuresRu: ['образы', 
                  'рассвет или закат',
                  'можно съемку с лошадью', 
                  'поющие барханы'],
    featuresKk: ['суреттер', 
                'таң немесе күн батуы',
                'атпен түсіруге болады', 
                'әнші барханалар'],
  },
  {
    id: 'studio',
    nameRu: 'Студия',
    nameKk: 'Студия',
    imagePath: '/locations/9.jpg',
    isActive: true,
    sortOrder: 3,
    featuresRu: [
          'более 5-и локации',
          '2 образа', 
          'бэкстейдж', 
          'гримерка', 
          'бар'
    ],
    featuresKk: [
          '5-тен астам-және орындар',
          '2 көрініс', 
          'backstage', 
          'киім ауыстыратын бөлме', 
          'бар'
    ],
  },
  {
    id: 'restaurant',
    nameRu: 'Ресторан',
    nameKk: 'Ресторан',
    imagePath: '/locations/4.jpg',
    isActive: true,
    sortOrder: 4,
    featuresRu: [
          'образы в стиле luxury', 
          'эстетичные локации', 
          '10% скидка на выпускной банкет'],
    featuresKk: [
          'luxury стиліндегі көріністер', 
          'эстетикалық орындар', 
          '10% бітіру банкетіне жеңілдік'],
  },
  {
    id: 'hippodrome',
    nameRu: 'Ипподром',
    nameKk: 'Атты спорт стадиону',
    imagePath: '/locations/11.jpg',
    isActive: true,
    sortOrder: 5,
    featuresRu: [
              'локация фильма «Малай»',
              'образы богатыря', 
              'юрта', 
              'горы', 
              'алты бакан', 
              'стрельба из лука'],
    featuresKk: [
              '"Малай" фильмінің орны',
              'батырдың бейнелері', 
              'киіз үй', 
              'таулар', 
              "алтын бақан", 
              'садақ ату'],
  },
  {
    id: 'forsage',
    nameRu: 'Форсаж',
    nameKk: 'Форсаж',
    imagePath: '/locations/1.jpg',
    isActive: true,
    sortOrder: 6,
    featuresRu: [
      'образы из фильма «Форсаж»',
      'японские машины', 
      'цветные дымы', 
      'бэкстейдж'],
    featuresKk: [
      '"Форсаж" фильміндегі суреттер',
      'жапондық машиналар', 
      'түрлі-түсті түтіндер', 
      'backstage'],
  },
  {
    id: 'jetCabin',
    nameRu: 'Jet Cabin',
    nameKk: 'Jet Cabin',
    imagePath: '/locations/2.jpg',
    isActive: true,
    sortOrder: 7,
    featuresRu: [
      'VIP кабинки', 
      'образы в деловом стиле',
      'бэкстейдж'
    ],
    featuresKk: [
      'VIP стендтер', 
      'іскерлік стильдегі кескіндер',
      'backstage'
    ],
  },
  {
    id: 'tennis',
    nameRu: 'Теннис',
    nameKk: 'Теннис',
    imagePath: '/locations/5.jpg',
    isActive: true,
    sortOrder: 8,
    featuresRu: [
      'эстетичные образы', 
      'индивидуальное фото',
      'открытый корт'
    ],
    featuresKk: [
      'эстетикалық бейнелер', 
      'жеке фотосурет',
      'ашық сот'
    ],
  },
  {
    id: 'aerodrome',
    nameRu: 'Аэродром',
    nameKk: 'Әуебазасы',
    imagePath: '/locations/7.jpg',
    isActive: true,
    sortOrder: 9,
    featuresRu: [
      'образы в стиле 90-х', 
      'ретро самолеты ',
      'индивидуальное фото ',
      'бэкстейдж'
    ],
    featuresKk: [
      '90-шы жылдардағы суреттер', 
      'ретро ұшақтар',
      'жеке фотосурет ',
      'backstage'
    ],
  },
  {
    id: 'checkersOnSaina',
    nameRu: 'Шашки на Саина',
    nameKk: 'Сайында Шашка',
    imagePath: '/locations/3.jpg',
    isActive: true,
    sortOrder: 10,
    featuresRu: [
      'люксовые машины ',
      'красная дорожка ',
      'индивидуальное фото'
    ],
    featuresKk: [
      'люкс машиналар ',
      'қызыл кілем ',
      'жеке фотосурет'
    ],
  },
  {
    id: 'helicopter',
    nameRu: 'Вертолёт',
    nameKk: 'Вертолёт',
    imagePath: '/locations/8.jpg',
    isActive: true,
    sortOrder: 11,
    featuresRu: [
      'дымовые эффекты ',
      'красная дорожка ',
      'индивидуальное фото',
      'бэкстейдж'
    ],
    featuresKk: [
      'түтін әсерлері ',
      'қызыл кілем ',
      'жеке фотосурет',
      'backstage'
    ],
  },
];

export function getActiveLocations(): Location[] {
  return locations.filter((loc) => loc.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLocationById(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}
