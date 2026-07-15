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
      // Keep noindex pages (privacy, terms, 404 — en and /fr/ alike) and the RSS feed
      // out of the sitemap.
      filter: (page) => !['privacy', 'terms', '404', 'rss'].some((s) => page.includes('/' + s)),
      // Blog uses localized slugs (EN /blog, FR /fr/blogue) that the i18n auto-pairing
      // can't map — it would emit a bogus /fr/blog. Drop the sitemap alternates for blog
      // URLs; the correct hreflang is emitted in each page's HTML head instead.
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (/^\/blog(\/|$)/.test(path) || /^\/fr\/blogue(\/|$)/.test(path)) {
          delete item.links;
        }
        return item;
      },
    }),
  ],
});
