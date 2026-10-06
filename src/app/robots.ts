import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.elkbusinesshub.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/super-admin'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
