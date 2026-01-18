/**
 * Legacy Pricing Engine (kept for backward compatibility)
 * New pricing engine is in pricingConfig.ts
 */

export interface PricingInput {
  students: number;
  pages: number;
  locationFee: number;
  addons: Addon[];
}

export interface Addon {
  type: 'premiumCover' | 'urgent' | 'delivery';
  price: number;
}

export interface PricingResult {
  basePricePerAlbum: number;
  totalBasePrice: number;
  locationFee: number;
  addonsCost: number;
  volumeDiscount: number;
  subtotal: number;
  total: number;
  pricePerStudent: number;
}

// Base price per album based on page count
const BASE_PRICE_TABLE: Record<number, number> = {
  4: 3000,   // 3,000 KZT for 4 pages
  6: 4000,   // 4,000 KZT for 6 pages
  8: 5000,   // 5,000 KZT for 8 pages
  10: 6000,  // 6,000 KZT for 10 pages
};

// Volume discount tiers (students count -> discount percentage)
const VOLUME_DISCOUNT_TIERS: Array<{ minStudents: number; discountPercent: number }> = [
  { minStudents: 30, discountPercent: 5 },   // 5% discount for 30+ students
  { minStudents: 50, discountPercent: 10 },  // 10% discount for 50+ students
  { minStudents: 100, discountPercent: 15 }, // 15% discount for 100+ students
];

// Addon prices (can be set to 0 if pricing is "request quote")
export const ADDON_PRICES: Record<string, number> = {
  premiumCover: 2000,  // 2,000 KZT
  urgent: 5000,         // 5,000 KZT
  delivery: 3000,       // 3,000 KZT
};

/**
 * Get base price per album based on page count
 */
export function pricePerAlbum(pages: number): number {
  const price = BASE_PRICE_TABLE[pages];
  if (!price) {
    throw new Error(`Invalid page count: ${pages}. Valid options: ${Object.keys(BASE_PRICE_TABLE).join(', ')}`);
  }
  return price;
}

/**
 * Calculate volume discount percentage based on student count
 */
function getVolumeDiscountPercent(students: number): number {
  let maxDiscount = 0;
  for (const tier of VOLUME_DISCOUNT_TIERS) {
    if (students >= tier.minStudents) {
      maxDiscount = Math.max(maxDiscount, tier.discountPercent);
    }
  }
  return maxDiscount;
}

/**
 * Calculate total price for an order
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const { students, pages, locationFee, addons } = input;

  // Base price per album
  const basePricePerAlbum = pricePerAlbum(pages);

  // Total base price (before discounts)
  const totalBasePrice = basePricePerAlbum * students;

  // Calculate addons cost
  const addonsCost = addons.reduce((sum, addon) => sum + addon.price, 0);

  // Calculate volume discount
  const discountPercent = getVolumeDiscountPercent(students);
  const volumeDiscount = (totalBasePrice * discountPercent) / 100;

  // Subtotal (base + location + addons - discount)
  const subtotal = totalBasePrice + locationFee + addonsCost - volumeDiscount;

  // Total (same as subtotal for now, can add taxes here)
  const total = subtotal;

  // Price per student
  const pricePerStudent = total / students;

  return {
    basePricePerAlbum,
    totalBasePrice,
    locationFee,
    addonsCost,
    volumeDiscount,
    subtotal,
    total,
    pricePerStudent,
  };
}

/**
 * Get available page options
 */
export function getAvailablePages(): number[] {
  return Object.keys(BASE_PRICE_TABLE).map(Number).sort((a, b) => a - b);
}

/**
 * Get addon price (returns 0 if not priced, indicating "request quote")
 */
export function getAddonPrice(type: string): number {
  return ADDON_PRICES[type] || 0;
}
