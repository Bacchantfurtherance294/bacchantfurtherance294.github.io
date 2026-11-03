import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danielgrandibbq.github.io',
  output: 'static',
  redirects: { '/': '/pt/' },
  integrations: [sitemap()],
  vite: {
    build: {
      rollupOptions: {
        // Pagefind writes this browser module after Astro finishes building.
        // Preserve its URL as a runtime import instead of bundling it.
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});
