import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://f1justin.com',
  compressHTML: true,
  integrations: [react()],
});
