// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://elevatek.ca',
  // Bilingual: English is the default and stays unprefixed (/, /contact).
  // French lives under /fr/. prefixDefaultLocale:false keeps every English URL
  // exactly where it was, preserving the canonical + sitemap work for elevatek.ca.
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Emit <xhtml:link hreflang> alternates so Google pairs the en/fr versions.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-CA', fr: 'fr-CA' },
      },
      // Keep noindex pages (privacy, terms, 404 — en and /fr/ alike) out of the sitemap.
      filter: (page) => !['privacy', 'terms', '404'].some((s) => page.includes('/' + s)),
    }),
  ],
});
