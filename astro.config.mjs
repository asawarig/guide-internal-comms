import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://plumhq.com',
  base: '/library/internal-communications',
  output: 'static',
});
