import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const repoBase = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://username.github.io',
  base: repoBase,
  integrations: [tailwind({ applyBaseStyles: false })]
});
