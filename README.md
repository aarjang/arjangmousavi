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

## Profile photo

- Hero photo currently uses: `public/images/arjang-portrait.svg` (luxury placeholder).
- Replace it with your real portrait and update `src/components/Hero.astro` to point to the new file (recommended: `.webp`).

## Contact form configuration

The contact form uses FormSubmit (no backend needed) with captcha enabled.

- Form action is generated from `contact.email` in:
  - `src/content/site.en.json`
  - `src/content/site.fa.json`
- Set your Gmail (or preferred inbox email) there, for example: `yourname@gmail.com`
- On first submission, FormSubmit sends a verification email; confirm once to activate delivery.

## SEO assets

- Dynamic localized metadata + hreflang
- JSON-LD Person schema
- `public/og-image.svg`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
