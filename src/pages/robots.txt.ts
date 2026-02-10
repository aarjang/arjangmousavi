import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const currentSite = site || new URL('https://username.github.io');
  const base = import.meta.env.BASE_URL || '/';
  const sitemapUrl = new URL(`${base}sitemap.xml`, currentSite).toString();

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
