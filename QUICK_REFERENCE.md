# Quick Reference Guide

## 🎯 What Changed

### NEW FEATURES
✨ **Pricing Engine** - Complex calculation with exact formula
✨ **Bonuses Selector** - Choose exactly 2 from 7 bonuses  
✨ **Packages Page** - New /packages route showcasing 3 service tiers
✨ **Enhanced Pricing UI** - Better form with cover selection

### UPDATED FEATURES  
🔄 **Pricing Calculator** - New engine, better UX
🔄 **Locations Data** - Added features, new image structure
🔄 **Gallery Page** - Removed filters, simpler display
🔄 **Navigation** - Added packages link

### TRANSLATIONS
📝 ~50+ new Russian (ru.json) translation keys
📝 ~50+ new Kazakh (kk.json) translation keys

---

## 📁 Files Summary

**NEW**: 4 files
- Pricing config
- Bonuses component  
- Packages data
- Packages page

**MODIFIED**: 9 files
- Pricing calculator (complete rewrite)
- Messaging library
- Navigation component
- Data files (locations, gallery, packages)
- Translation files (ru.json, kk.json)

**TOTAL CHANGED**: 13 files

---

## 🔧 Pricing Algorithm

```
Input: students, free copies, pages, locations, cover, add-ons

1. paidCount = students - freeCopies
2. if paidCount <= 0: INVALID
3. locationsCost = sum(location prices by duration)
4. fixedCost = locationsCost + 30000 (photographer) + addons
5. perStudent = fixedCost / paidCount
6. total = roundTo10(perStudent + cover + (pages × 300) + 15000)
7. TOTAL = total × paidCount

Output: pricePerStudent, totalCost
```

---

## 🎨 New UI Components

### BonusesSelector
```tsx
<BonusesSelector
  selectedBonuses={state}
  onSelectionChange={setState}
/>
```
- Max 2 selections
- Auto-disables when full
- Full i18n support

### PricingCalculator
```tsx
<PricingCalculator locations={locations} />
```
- Students input
- Pages buttons (4/6/8/10)
- Cover radio buttons
- Multi-location dropdowns
- Add-ons checkboxes
- Bonuses selector
- Price summary sidebar

---

## 📦 Pricing Constants (All in pricingConfig.ts)

| Item | Price (KZT) |
|------|-----------|
| Photographer | 30,000 |
| Per Page | 300 |
| Margin/Album | 15,000 |
| **Covers** | |
| Standard | 0 |
| Premium | 5,000 |
| Luxury | 10,000 |
| **Add-ons** | |
| Express | 5,000 |
| Delivery | 3,000 |
| Packaging | 2,000 |
| **Locations** (examples) | |
| Studio (1h) | 5,000 |
| Studio (2h) | 8,000 |

---

## 🗂️ Data Structures

### Location
```typescript
{
  id: string
  nameRu: string
  nameKk: string
  featuresRu: string[]
  featuresKk: string[]
  imageUrl: string  // /locations/{id}.jpg
  isActive: boolean
  sortOrder: number
}
```

### GalleryItem
```typescript
{
  id: string
  imagePath: string  // /gallery/...
  title: string
}
```

### ServicePackage
```typescript
{
  id: string
  nameRu: string
  nameKk: string
  includedRu: string[]
  includedKk: string[]
  notesRu?: string
  notesKk?: string
}
```

---

## 🌍 Translation Keys

### pricing.*
- students: label, placeholder, paid, free
- pages: label
- cover: label
- location: label, selectPlaceholder, selected
- addons: title, express, delivery, packaging
- bonuses: label, maxSelection, selectedCount
- summary: 8+ keys

### packages.*
- title, subtitle, popular
- included, comparison
- 8+ feature table labels
- contactMessage

---

## ✅ Deployment Checklist

- [x] Build succeeds (npm run build)
- [x] No TypeScript errors
- [x] All 17 pages generated
- [x] All translations complete
- [x] Pricing engine tested
- [x] All components working
- [x] i18n properly configured
- [x] Ready for Netlify

**Deploy**: `npm run build` → Netlify

---

## 🚨 Important Notes

1. **Locations Page**: Features data added, addresses still in data but not displayed
2. **Gallery Page**: No images in database yet (TODO: add to public/gallery/)
3. **Packages Page**: Data hardcoded, structure ready for PDF extraction
4. **Pricing Formula**: Uses exact algorithm specified, roundTo10 for final price
5. **All Text**: Never hardcoded - always uses i18n via useTranslations()

---

## 📞 Support

For questions about:
- **Pricing Algorithm** → See `src/config/pricingConfig.ts`
- **New Components** → See `src/components/pricing/`
- **Data Structure** → See `src/data/`
- **Translations** → See `messages/ru.json` or `messages/kk.json`
- **Pages** → See `src/app/[locale]/`

---

**Status**: ✅ Production Ready
**Build**: ✅ Verified
**Deploy**: Ready for Netlify
