# Виньетки Алматы - School Vignette Ordering Platform

Production-ready responsive web application for ordering school "vignette" printed albums in Almaty, Kazakhstan.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl (ru/kk)
- **Testing**: Vitest

## Features

- 🌍 **Bilingual Support**: Russian (ru) and Kazakh (kk) with locale-based routing
- 📱 **Mobile-First**: Fully responsive design optimized for mobile and desktop
- 💰 **Pricing Calculator**: Step-by-step configurator with real-time price calculation
- 📍 **Location Management**: Static location data (easy to edit in `src/data/locations.ts`)
- 📸 **Gallery**: Image gallery with style filters
- 💬 **Direct Contact**: WhatsApp and Telegram integration with prefilled messages
- ♿ **Accessible**: Built with accessibility best practices

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routes
│   │   ├── (marketing)/   # Marketing pages
│   │   └── layout.tsx     # Locale layout
│   └── globals.css        # Global styles
├── components/
│   ├── contact/           # Contact page
│   ├── home/              # Home page components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── locations/         # Location components
│   ├── pricing/           # Pricing calculator
│   └── ui/                # Reusable UI components
├── config/
│   └── pricing.ts         # Pricing engine configuration
├── data/
│   ├── locations.ts       # Static location data
│   └── gallery.ts         # Static gallery data
├── i18n/                  # i18n configuration
├── lib/                   # Utilities (formatters, messaging, utils)
└── middleware.ts          # Next.js middleware for i18n

messages/
├── ru.json                # Russian translations
└── kk.json                # Kazakh translations
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/ru](http://localhost:3000/ru) or [http://localhost:3000/kk](http://localhost:3000/kk) in your browser.

**Note**: No environment variables or database setup required!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Configuration

### Pricing Engine

Edit `src/config/pricing.ts` to adjust:
- Base prices per page count
- Volume discount tiers
- Addon prices

### Locations

Edit `src/data/locations.ts` to add, remove, or modify locations. The structure is:
- `id`: Unique identifier
- `nameRu` / `nameKk`: Location names in both languages
- `addressRu` / `addressKk`: Addresses (optional)
- `fee`: Location fee in KZT
- `imageUrl`: Image URL (optional)
- `isActive`: Whether location is active
- `sortOrder`: Display order

### Gallery

Edit `src/data/gallery.ts` to manage gallery items.

## Contact Integration

The app uses direct WhatsApp and Telegram links:

- **WhatsApp**: `https://wa.me/87004304030?text=<ENCODED_MESSAGE>`
- **Telegram**: `https://t.me/Shaaankk`

When users calculate a price, they can click buttons to open WhatsApp/Telegram with a prefilled message containing:
- Number of students
- Number of pages
- Selected location
- Total price (formatted in KZT)
- Optional date and comment

The message is automatically generated in the user's current locale (ru/kk).

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy (no environment variables needed)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## License

MIT
