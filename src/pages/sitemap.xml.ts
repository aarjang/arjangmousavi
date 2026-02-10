import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const currentSite = site || new URL('https://username.github.io');
  const base = import.meta.env.BASE_URL || '/';
  const urls = [
    new URL(base, currentSite).toString(),
    new URL(`${base}fa/`, currentSite).toString()
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
