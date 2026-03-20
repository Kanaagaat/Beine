/**
 * Pricing Configuration - EXACT PRICES IN KZT
 * Single source of truth for all pricing
 */

// Cover types configuration
export type CoverTypeId = 'hard_classic' | 'combo_cover';

export interface CoverType {
  id: CoverTypeId;
  price: number; // KZT, I will set values later
}

export const COVER_TYPES: CoverType[] = [
  {
    id: 'hard_classic',
    price: 0, // TODO: set real price
  },
  {
    id: 'combo_cover',
    price: 0, // TODO: set real price
  },
];

// Cover finish configuration
export type CoverFinishId = 'matte' | 'glossy' | 'eco_leather' | 'diamond';

export interface CoverFinish {
  id: CoverFinishId;
  price: number; // All are free now, but keep for future use
}

export const COVER_FINISHES: CoverFinish[] = [
  { id: 'matte', price: 0 },
  { id: 'glossy', price: 0 },
  { id: 'eco_leather', price: 0 },
  { id: 'diamond', price: 0 },
];

// Fixed costs (KZT)
export const PHOTOGRAPHER_PRICE = 30000;
export const HARD_COVER_COST = 1800;
export const PAGE_PRICE = 600; // per page (min 2 irrelevant: pages are 4/6/8/10)
export const FREE_COPIES = 0; // free album for class leader (староста)
export const MARGIN_PER_PAID_ALBUM = 15000;

// Location prices: 1-hour / 2-hour rates (KZT)
// Rule: if studentsTotal > 15 use 2-hour price, else 1-hour price
export const LOCATIONS_PRICES: Record<string, { oneHour: number; twoHours: number } | null> = {
  park: { oneHour: 0, twoHours: 0 },
  dune: { oneHour: 5000, twoHours: 5000 }, // TODO: support 0–5000 range UI later
  studio: { oneHour: 15000, twoHours: 30000 },
  restaurant: { oneHour: 20000, twoHours: 40000 },
  hippodrome: { oneHour: 10000, twoHours: 20000 },
  forsage: { oneHour: 25000, twoHours: 50000 },
  jetCabin: { oneHour: 18000, twoHours: 36000 },
  tennis: { oneHour: 25000, twoHours: 50000 },
  aerodrome: { oneHour: 50000, twoHours: 80000 },
  checkersOnSaina: { oneHour: 60000, twoHours: 60000 },
  helicopter: null, // Not available - disable or show "On request"
};

// Add-on prices (KZT)
export const ADDONS_PRICES: Record<string, number> = {
  delivery: 50000, // Развозка
  limousine: 40000, // Лимузин
  ribbon: 1000, // Лента
};

// Bonuses that users can select (max 2) - normal casing, no CAPS
// Use as simple string array for selections
export const BONUSES: string[] = [
  'Фото будущего',
  'Бесплатный ЕНТ курсы',
  'Backstage video',
  'Индивидуальное фото',
  'Электронный формат фото',
];

// Spread count options available (1 spread = 2 pages)
export const SPREADS_OPTIONS = [1, 3, 4, 5] as const;
export type SpreadCount = typeof SPREADS_OPTIONS[number];

/**
 * Get minimum spreads required based on location count
 * Rule: each location needs at least 1 spread
 */
export function getMinSpreadsForLocations(locationCount: number): number {
  return Math.max(1, locationCount);
}

/**
 * Get recommended spreads for many locations (> 5)
 * When locations > 5, suggest slightly more spreads than locations for better coverage
 */
export function getRecommendedSpreadsForLocations(locationCount: number): number {
  if (locationCount <= 5) return locationCount;
  return locationCount + 1; // slightly more than locations for many location scenarios
}

/**
 * Calculate location cost based on selected locations and student count
 * Rule: if studentsTotal > 20 use 2-hour price, else 1-hour price
 */
export function calculateLocationsCostTotal(
  locationIds: string[],
  studentsTotal: number
): number {
  const useTwoHour = studentsTotal > 20;
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
 * Inputs: studentsTotal, pages, locationIds, addons, coverTypeId, coverFinishId
 * Returns: paidCount, freeCopies, pricePerStudent, totalCost
 */
export interface PricingInput {
  studentsTotal: number;
  spreads: SpreadCount;
  locationIds: string[];
  addons: Record<string, boolean>; // delivery, limousine, ribbon
  coverTypeId: CoverTypeId;
  coverFinishId: CoverFinishId;
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
  const { studentsTotal, spreads, locationIds, addons, coverTypeId, coverFinishId } = input;

  // Validate
  const paidCount = studentsTotal;
  if (paidCount <= 0) {
    return {
      isValid: false,
      error: 'Must have at least 1 paying student',
      paidCount: 0,
      freeCopies: 0,
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

  // Get cover cost from selected cover type
  const selectedCover = COVER_TYPES.find((c) => c.id === coverTypeId);
  const coverCost = selectedCover?.price ?? 0;

  // Cover finish cost (all are free for now)
  const selectedFinish = COVER_FINISHES.find((f) => f.id === coverFinishId);
  const finishCost = selectedFinish?.price ?? 0;

  // Algorithm
  // X = locationsCostTotal + photographer + addonsCost
  // Z = X / paidCount
  // pricePerStudent = roundTo10(Z + coverCost + finishCost + spreadsCost + marginPerPaidAlbum)
  const X = locationsCostTotal + PHOTOGRAPHER_PRICE + addonsCost;
  const Z = X / paidCount;
  const spreadsCost = spreads * PAGE_PRICE + HARD_COVER_COST;
  const pricePerStudent = roundTo10(Z + coverCost + finishCost + spreadsCost + MARGIN_PER_PAID_ALBUM);
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
