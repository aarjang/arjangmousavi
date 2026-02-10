# Arjang Mousavi Personal Brand Site

Luxury minimal static personal brand website built with Astro + Tailwind CSS, localized in English and Persian.

## Stack

- Astro (static output)
- Tailwind CSS
- GitHub Pages deployment via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Localization routes

- English: `/`
- Persian: `/fa/` (RTL)

## Base path for GitHub Pages

This project supports repository pages like `https://username.github.io/repo/`.

- `astro.config.mjs` reads `BASE_PATH` and applies it as `base`.
- GitHub Actions automatically resolves:
  - `/` for user/org pages (`username.github.io` repo)
  - `/<repo>/` for project pages

For local repo-path testing:

```bash
BASE_PATH=/repo/ SITE_URL=https://username.github.io npm run build
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In GitHub repo settings:
   - Open `Settings > Pages`
   - Set source to `GitHub Actions`
3. Ensure default branch is `main`.
4. Push to `main`; workflow at `.github/workflows/deploy.yml` builds and deploys.

## Content updates

Edit language copy files:

- `src/content/site.en.json`
- `src/content/site.fa.json`

## Contact form configuration

The contact form is prepared for Formspree:

- Current action: `https://formspree.io/f/REPLACE_WITH_FORM_ID`
- Replace `REPLACE_WITH_FORM_ID` with your real Formspree form id.
- If not configured, the site automatically falls back to `mailto:`.

## SEO assets

- Dynamic localized metadata + hreflang
- JSON-LD Person schema
- `public/og-image.svg`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
