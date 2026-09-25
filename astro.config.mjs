import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Base path can be overridden with BASE_PATH env var (used by the GitHub Pages
// preview build). Default is the Webflow Cloud production path.
const base = process.env.BASE_PATH || '/library/internal-communications';

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL || 'https://plumhq.com',
  base,
  output: 'static',
});
