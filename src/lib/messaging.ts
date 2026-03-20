import { formatKZT } from './formatters';

export interface InquiryData {
  students?: number;
  studentsTotal?: number;
  paidCount?: number;
  freeCopies?: number;
  pages?: number;
  locationId?: string;
  total?: number;
  totalCost?: number;
  pricePerStudent?: number;
  desiredDate?: string;
  comment?: string;
  selectedLocations?: string;
  locations?: string;
  addons?: string;
  bonuses?: string;
  coverType?: string;
  coverFinish?: string;
}

/**
 * Build inquiry message in Russian or Kazakh based on locale
 */
export function buildInquiryMessage(
  data: InquiryData,
  locale: 'ru' | 'kk'
): string {
  const students = data.studentsTotal || data.students || 0;
  const paidCount = data.paidCount || 0;
  const freeCopies = data.freeCopies || 0;
  const pages = data.pages || 0;
  const pricePerStudent = data.pricePerStudent || 0;
  const totalCost = data.totalCost || data.total || 0;
  const locations = data.locations || data.selectedLocations || '—';
  const addons = data.addons || '—';
  const bonuses = data.bonuses || '—';
  const coverType = data.coverType || '—';
  const coverFinish = data.coverFinish || '—';

  if (locale === 'ru') {
    return `Здравствуйте! Я заинтересован в услугах виньеток и альбомов.

Количество учеников: ${students}${freeCopies > 0 ? ` (${paidCount} платящих, 1 бесплатно)` : ''}
Разворотов: ${pages}
Тип виньетки: ${coverType}
Вид обложки: ${coverFinish}
Локации: ${locations}
Дополнительные услуги: ${addons}
Выбранные бонусы: ${bonuses}

Цена за ученика: ${formatKZT(pricePerStudent)}
Общая стоимость: ${formatKZT(totalCost)}

Могли бы вы отправить дополнительную информацию и подтвердить цену?`;
  } else {
    return `Сәлеметсіз бе! Мен виньетка және альбом қызметтеріне қызығушымын.

Оқушылар саны: ${students}${freeCopies > 0 ? ` (${paidCount} төлеген, 1 тегін)` : ''}
Бұрылыстар саны: ${pages}
Виньетка түрі: ${coverType}
Мұқаба беті: ${coverFinish}
Локациялар: ${locations}
Қосымша қызметтер: ${addons}
Таңдалған бонустар: ${bonuses}

Оқушыға баға: ${formatKZT(pricePerStudent)}
Жалпы құны: ${formatKZT(totalCost)}

Сіз қосымша ақпарат жіберіп, бағаны растай аласыз ба?`;
  }
}

/**
 * Generate WhatsApp URL for Аружан with prefilled message
 * (backward compatible name for the original number)
 */
export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/77067004201?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp URL for Аружан with prefilled message
 */
export function getWhatsAppUrlForAruzhan(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/77002741686?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp URL for Дина with prefilled message
 */
export function getWhatsAppUrlForDina(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/77067004201?text=${encodedMessage}`;
}
