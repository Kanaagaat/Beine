import { describe, it, expect } from 'vitest';
import {
  calculatePrice,
  pricePerAlbum,
  getAvailablePages,
  getAddonPrice,
  type PricingInput,
} from './pricing';

describe('Pricing Engine', () => {
  describe('pricePerAlbum', () => {
    it('should return correct price for valid page counts', () => {
      expect(pricePerAlbum(10)).toBe(5000);
      expect(pricePerAlbum(12)).toBe(5500);
      expect(pricePerAlbum(16)).toBe(6500);
      expect(pricePerAlbum(20)).toBe(7500);
      expect(pricePerAlbum(24)).toBe(8500);
      expect(pricePerAlbum(28)).toBe(9500);
    });

    it('should throw error for invalid page count', () => {
      expect(() => pricePerAlbum(15)).toThrow();
      expect(() => pricePerAlbum(0)).toThrow();
    });
  });

  describe('calculatePrice', () => {
    it('should calculate basic price without discounts', () => {
      const input: PricingInput = {
        students: 25,
        pages: 20,
        locationFee: 10000,
        addons: [],
      };

      const result = calculatePrice(input);

      expect(result.basePricePerAlbum).toBe(7500);
      expect(result.totalBasePrice).toBe(187500); // 7500 * 25
      expect(result.locationFee).toBe(10000);
      expect(result.addonsCost).toBe(0);
      expect(result.volumeDiscount).toBe(0);
      expect(result.total).toBe(197500); // 187500 + 10000
      expect(result.pricePerStudent).toBe(7900); // 197500 / 25
    });

    it('should apply volume discount for 30+ students', () => {
      const input: PricingInput = {
        students: 35,
        pages: 16,
        locationFee: 5000,
        addons: [],
      };

      const result = calculatePrice(input);

      expect(result.totalBasePrice).toBe(227500); // 6500 * 35
      expect(result.volumeDiscount).toBe(11375); // 5% of 227500
      expect(result.total).toBe(221125); // 227500 + 5000 - 11375
    });

    it('should apply higher volume discount for 50+ students', () => {
      const input: PricingInput = {
        students: 60,
        pages: 20,
        locationFee: 8000,
        addons: [],
      };

      const result = calculatePrice(input);

      expect(result.totalBasePrice).toBe(450000); // 7500 * 60
      expect(result.volumeDiscount).toBe(45000); // 10% of 450000
      expect(result.total).toBe(413000); // 450000 + 8000 - 45000
    });

    it('should include addons in total', () => {
      const input: PricingInput = {
        students: 20,
        pages: 12,
        locationFee: 5000,
        addons: [
          { type: 'premiumCover', price: 2000 },
          { type: 'urgent', price: 5000 },
        ],
      };

      const result = calculatePrice(input);

      expect(result.addonsCost).toBe(7000);
      expect(result.totalBasePrice).toBe(110000); // 5500 * 20
      expect(result.total).toBe(122000); // 110000 + 5000 + 7000
    });

    it('should calculate price per student correctly', () => {
      const input: PricingInput = {
        students: 10,
        pages: 10,
        locationFee: 10000,
        addons: [],
      };

      const result = calculatePrice(input);

      expect(result.total).toBe(60000); // 5000 * 10 + 10000
      expect(result.pricePerStudent).toBe(6000); // 60000 / 10
    });
  });

  describe('getAvailablePages', () => {
    it('should return sorted array of available page counts', () => {
      const pages = getAvailablePages();
      expect(pages).toEqual([10, 12, 16, 20, 24, 28]);
    });
  });

  describe('getAddonPrice', () => {
    it('should return correct price for known addons', () => {
      expect(getAddonPrice('premiumCover')).toBe(2000);
      expect(getAddonPrice('urgent')).toBe(5000);
      expect(getAddonPrice('delivery')).toBe(3000);
    });

    it('should return 0 for unknown addons', () => {
      expect(getAddonPrice('unknown')).toBe(0);
    });
  });
});
