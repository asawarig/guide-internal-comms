# The Plum guide to internal communications

An Astro build of the single-page guide, ready to plug into Webflow Cloud.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to ./dist
npm run preview   # preview the build
```

Base path is set to `/guides/internal-communications` in `astro.config.mjs`. Change it if the guide series lives elsewhere.

## Where the copy lives

All copy is in `src/content/guide.ts`. Sections, bands, editor's notes, stats, sources, take-away pack, and the four interactive datasets are exported from that one file. Layout code does not need to change to edit copy.

## Structure

- `src/pages/index.astro` — single scrollable page.
- `src/layouts/Base.astro` — shell (head, header, footer).
- `src/components/Section.astro` — the five-part shape (why, what good, bands, mistake, take away) with the editor's-note margin.
- `src/components/TableOfContents.astro` — sticky ToC on desktop, scroll-spy.
- `src/components/HeroArt.astro`, `PartArt.astro` — inline SVG illustrations. Placeholders in the Plum palette.
- Interactive islands (React, hydrated on visible/load):
  - `HeadcountStack.tsx` — the headcount slider.
  - `WhatGoesWhere.tsx` — drag-and-drop grid inside section 6.
  - `DecisionTree.tsx` — three-question decision tree inside section 8.
  - `ResponsePolicy.tsx` — policy builder inside section 10.

## Design tokens

`src/styles/global.css` holds the Plum tokens as CSS variables on `:root`. Dark mode redefines them under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]` when the toggle is used.

Fonts: GT Alpina (display) and Passenger Sans (body) if licensed on the host, with `Iowan Old Style`/`Georgia` and `Inter`/`system-ui` as fallbacks.

## Webflow Cloud

The build is a static site. Point Webflow Cloud at `npm run build` with output directory `dist`. Base path is `/guides/internal-communications`. If the URL differs, edit `base` in `astro.config.mjs` before deploying.
