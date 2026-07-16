// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages whose French slug is localized rather than a /fr/ + same-slug mirror:
//   /blog                     ↔ /fr/blogue
//   /salesforce-implementation ↔ /fr/implantation-salesforce
// The sitemap's i18n auto-pairing can't map these — it would emit a bogus
// /fr/blog or /fr/salesforce-implementation — so their sitemap alternates are
// dropped here and the correct hreflang is emitted in each page's HTML head
// instead (Base.astro's enHref/frHref). Add a pattern here for every future
// localized slug.
const LOCALIZED_SLUGS = [
  /^\/blog(\/|$)/,
  /^\/fr\/blogue(\/|$)/,
  /^\/salesforce-implementation(\/|$)/,
  /^\/fr\/implantation-salesforce(\/|$)/,
];

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
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (LOCALIZED_SLUGS.some((re) => re.test(path))) {
          delete item.links;
        }
        return item;
      },
    }),
  ],
});
