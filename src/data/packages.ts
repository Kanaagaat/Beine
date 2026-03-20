/**
 * Service Packages Data
 * Describes different service offerings and what's included
 */

export interface ServicePackage {
  id: string;
  nameRu: string;
  nameKk: string;
  priceKzt: number;
  priceLabelRu?: string;
  priceLabelKk?: string;
  includedRu: string[];
  includedKk: string[];
  notesRu?: string;
  notesKk?: string;
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'basic',
    nameRu: 'Пакет Мини',
    nameKk: 'Пакет kishi',
    priceKzt: 16990,
    includedRu: [
      '3 локации (4 стр)',
      'Школа',
      'Студия',
      'Парк',
      'в подарок:',
      'Индивидуальное фото',
      'Эл. формат фото',
      'Бесплатно для кл. руководителя',
    ],
    includedKk: [
      'Кәсіби фотосъемка (2 сағатқа дейін)',
      '1 локацияны таңдаңыз',
      'Стандартты мұқаба',
      '4 беттер(қосуға болады)',
      'Сапалы қағазға басып шығару',
      'Альбомдарды жеткізу',
    ],
    notesRu: 'Минимально количество участников: 15 человек',
    notesKk: 'Ең кем қатысушылар саны: 15 адам',
  },
  {
    id: 'premium',
    nameRu: 'Пакет Стандарт',
    nameKk: 'Пакет standart',
    priceKzt: 25990,
    includedRu: [
      '3 локации (6 стр)',
      'Студия',
      'Теннис',
      'Ипподром',
      'в подарок:',
      'ЕНТ курс',
      'Индивидуальное фото',
      'Эл. формат фото',
      'Бесплатно для кл. руководителя',
    ],
    includedKk: [
      'Кәсіби фотосъемка (3 сағатқа дейін)',
      'Бірнеше локацияны таңдаңыз',
      'Премиум мұқаба',
      '6 беттер(қосуға болады)',
      'Сыйлық орауы',
      'Әрбір қатысушының жеке фотосы',
      'Фотолардың электрондық пішімі',
    ],
    notesRu: 'Рекомендуется для классов от 25 человек',
    notesKk: '25 адамдан тұратын топтар үшін ұсынылады',
  },
  {
    id: 'luxury',
    nameRu: 'Пакет Премиум',
    nameKk: 'Пакет úlken',
    priceKzt: 34990,
    includedRu: [
      '4 локации (8 стр)',
      'Студия',
      'Jet самолёт',
      'Ресторан',
      'Форсаж',
      'в подарок:',
      'Бесплатная развозка',
      'ЕНТ курс',
      'Backstage',
      'Индивидуальное фото',
      'Эл. формат фото',
      'Бесплатно для кл. руководителя',
    ],
    includedKk: [
      'Кәсіби фотосъемка (сайын күндіз)',
      'Барлық локациялар таңдау',
      '8 беттер(қосуға болады)',
      'Эксклюзивті сыйлық орауы',
      'Фотолардың кәсіби өңдеуі',
      'Әрбір адамның жеке фото және видеосы',
      'Барлық материалдардың электрондық архивы',
      'Таңдау бойынша бонус материалы',
    ],
  },
];

export function getPackageById(id: string): ServicePackage | undefined {
  return servicePackages.find((pkg) => pkg.id === id);
}

export function getAllPackages(): ServicePackage[] {
  return servicePackages;
}
