import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ru', 'kk'],
  defaultLocale: 'ru',
  localePrefix: 'always'
});

// Create navigation instance once
const navigation = createNavigation(routing);

// Export using getters to ensure proper binding
export const Link = navigation.Link;
export const redirect = navigation.redirect;
export const usePathname = navigation.usePathname;
export const useRouter = navigation.useRouter;

// Type helper
export type { Pathnames } from 'next-intl/routing';
export type Locale = (typeof routing.locales)[number];
