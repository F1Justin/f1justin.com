import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.f1justin.com',
  compressHTML: true,
  integrations: [react()],
});
