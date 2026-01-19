/**
 * Pricing Configuration - EXACT PRICES IN KZT
 * Single source of truth for all pricing
 */

// Fixed costs (KZT)
export const PHOTOGRAPHER_PRICE = 30000;
export const HARD_COVER_COST = 1800;
export const PAGE_PRICE = 300; // per page (min 2 irrelevant: pages are 4/6/8/10)
export const FREE_COPIES = 1; // free album for class leader (староста)
export const MARGIN_PER_PAID_ALBUM = 15000;

// Location prices: 1-hour / 2-hour rates (KZT)
// Rule: if studentsTotal > 15 use 2-hour price, else 1-hour price
export const LOCATIONS_PRICES: Record<string, { oneHour: number; twoHours: number } | null> = {
  park: { oneHour: 0, twoHours: 0 },
  dune: { oneHour: 5000, twoHours: 5000 }, // TODO: support 0–5000 range UI later
  studio: { oneHour: 15000, twoHours: 30000 },
  restaurant: { oneHour: 15000, twoHours: 30000 },
  hippodrome: { oneHour: 15000, twoHours: 30000 },
  forsage: { oneHour: 15000, twoHours: 30000 },
  jetCabin: { oneHour: 18000, twoHours: 36000 },
  tennis: { oneHour: 25000, twoHours: 50000 },
  aerodrome: { oneHour: 40000, twoHours: 80000 },
  checkersOnSaina: { oneHour: 15000, twoHours: 30000 },
  helicopter: null, // Not available - disable or show "On request"
};

// Add-on prices (KZT)
export const ADDONS_PRICES: Record<string, number> = {
  delivery: 50000, // Развозка
  urgent: 5000, // Срочный заказ
  limousine: 40000, // Лимузин
  ribbon: 1000, // Лента
};

// Bonuses that users can select (max 2) - normal casing, no CAPS
// Use as simple string array for selections
export const BONUSES: string[] = [
  'Фото будущего',
  'Бесплатный ЕНТ курсы',
  'Участие в розыгрыше (Iphone 17 Pro Max)',
  'Backstage video',
  'Индивидуальное фото',
  'Электронный формат фото',
];

// Page count options available
export const PAGES_OPTIONS = [4, 6, 8, 10] as const;
export type PageCount = typeof PAGES_OPTIONS[number];

/**
 * Calculate location cost based on selected locations and student count
 * Rule: if studentsTotal > 15 use 2-hour price, else 1-hour price
 */
export function calculateLocationsCostTotal(
  locationIds: string[],
  studentsTotal: number
): number {
  const useTwoHour = studentsTotal > 15;
  let total = 0;

  for (const id of locationIds) {
    const prices = LOCATIONS_PRICES[id];
    if (!prices) continue; // Skip unavailable locations
    const price = useTwoHour ? prices.twoHours : prices.oneHour;
    total += price;
  }

  return total;
}

/**
 * Round price to nearest 10
 */
export function roundTo10(value: number): number {
  return Math.round(value / 10) * 10;
}

/**
 * Pricing engine: main calculation
 * Inputs: studentsTotal, pages, locationIds, addons
 * Returns: paidCount, freeCopies, pricePerStudent, totalCost
 */
export interface PricingInput {
  studentsTotal: number;
  pages: PageCount;
  locationIds: string[];
  addons: Record<string, boolean>; // delivery, urgent, limousine, ribbon
}

export interface PricingResult {
  isValid: boolean;
  error?: string;
  paidCount: number;
  freeCopies: number;
  pricePerStudent: number;
  totalCost: number;
  locationsCostTotal: number;
}

export function calculatePricing(input: PricingInput): PricingResult {
  const { studentsTotal, pages, locationIds, addons } = input;

  // Validate
  const paidCount = studentsTotal - FREE_COPIES;
  if (paidCount <= 0) {
    return {
      isValid: false,
      error: 'Must have at least 1 paying student',
      paidCount: 0,
      freeCopies: FREE_COPIES,
      pricePerStudent: 0,
      totalCost: 0,
      locationsCostTotal: 0,
    };
  }

  // Calculate costs
  const locationsCostTotal = calculateLocationsCostTotal(locationIds, studentsTotal);
  const addonsCost = Object.entries(addons).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (ADDONS_PRICES[key] || 0);
  }, 0);

  // Algorithm
  // X = locationsCostTotal + photographer + addonsCost
  // Z = X / paidCount
  // pricePerStudent = roundTo10(Z + hardCoverCost + pagesCost + marginPerPaidAlbum)
  const X = locationsCostTotal + PHOTOGRAPHER_PRICE + addonsCost;
  const Z = X / paidCount;
  const pagesCost = pages * PAGE_PRICE;
  const pricePerStudent = roundTo10(Z + HARD_COVER_COST + pagesCost + MARGIN_PER_PAID_ALBUM);
  const totalCost = pricePerStudent * paidCount;

  return {
    isValid: true,
    paidCount,
    freeCopies: FREE_COPIES,
    pricePerStudent,
    totalCost,
    locationsCostTotal,
  };
}
