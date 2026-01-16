import { formatKZT } from './formatters';
import { getLocationById, type Location } from '@/data/locations';
import { type PricingResult } from '@/config/pricing';

export interface InquiryData {
  students: number;
  pages: number;
  locationId: string;
  total: number;
  desiredDate?: string;
  comment?: string;
}

/**
 * Build inquiry message in Russian or Kazakh based on locale
 */
export function buildInquiryMessage(
  data: InquiryData,
  locale: 'ru' | 'kk'
): string {
  const location = getLocationById(data.locationId);
  const locationName = locale === 'ru' ? location?.nameRu || '—' : location?.nameKk || '—';
  const totalFormatted = formatKZT(data.total);
  const dateOrDash = data.desiredDate || '—';
  const commentOrDash = data.comment || '—';

  if (locale === 'ru') {
    return `Здравствуйте! Хочу заказать виньетки/альбомы в Алматы.
Ученики: ${data.students}
Страниц: ${data.pages}
Локация: ${locationName}
Примерная стоимость: ${totalFormatted}
Желаемая дата: ${dateOrDash}
Комментарий: ${commentOrDash}`;
  } else {
    return `Сәлеметсіз бе! Алматыда виньетка/альбомға тапсырыс бергім келеді.
Оқушылар саны: ${data.students}
Беттер саны: ${data.pages}
Локация: ${locationName}
Шамамен құны: ${totalFormatted}
Қалаған күн: ${dateOrDash}
Пікір: ${commentOrDash}`;
  }
}

/**
 * Generate WhatsApp URL with prefilled message
 */
export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/87004304030?text=${encodedMessage}`;
}

/**
 * Generate Telegram URL
 */
export function getTelegramUrl(): string {
  return 'https://t.me/Shaaankk';
}
