# Complete List of Changed Files

## ✨ New Files (4)

1. **src/config/pricingConfig.ts**
   - Pricing engine configuration
   - Constants and pricing formulas
   - Single source of truth

2. **src/components/pricing/BonusesSelector.tsx**
   - Component for selecting exactly 2 bonuses
   - Full i18n support

3. **src/data/packages.ts**
   - Service packages data
   - Basic, Premium, Luxury tiers

4. **src/app/[locale]/packages/page.tsx**
   - New packages showcase page
   - Comparison table
   - CTA section

---

## 📝 Modified Files (9)

1. **src/config/pricing.ts**
   - Marked legacy with comment

2. **src/components/pricing/PricingCalculator.tsx**
   - Complete rewrite for new pricing engine
   - Cover selection
   - Bonuses selector integration
   - Enhanced UI

3. **src/data/locations.ts**
   - Added featuresRu/Kk fields
   - Updated all 5 locations with features
   - Changed imageUrl to local paths

4. **src/data/gallery.ts**
   - Removed filtering
   - Changed imageUrl to imagePath
   - Simplified structure

5. **src/app/[locale]/gallery/page.tsx**
   - Removed filters
   - Updated to new gallery structure

6. **src/components/layout/Navbar.tsx**
   - Added /packages link

7. **src/lib/messaging.ts**
   - Refactored for new pricing data
   - Enhanced message format

8. **messages/ru.json**
   - ~50+ new translation keys
   - Expanded pricing section
   - New packages section

9. **messages/kk.json**
   - ~50+ new translation keys (Kazakh)
   - Mirror structure to ru.json

---

## ✅ Build Status
- npm run build: SUCCESS
- All 17 pages generated
- No TypeScript errors
- Ready for Netlify deployment
