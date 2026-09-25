import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://plumhq.com',
  base: '/guides/internal-communications',
  output: 'static',
});
