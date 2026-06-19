// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://elevatek.ca',
  integrations: [
    sitemap({
      // Keep noindex pages (privacy, terms, 404) out of the sitemap.
      filter: (page) => !['privacy', 'terms', '404'].some((s) => page.includes('/' + s)),
    }),
  ],
});
