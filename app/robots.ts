import type { MetadataRoute } from 'next';

/**
 * Standard Next.js App Router Robots.txt Configuration
 * Directs search spiders to public pages while shielding administrative surfaces.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ayyuq.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/api/private/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
