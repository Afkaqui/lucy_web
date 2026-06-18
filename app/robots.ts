import type { MetadataRoute } from 'next';

const BASE_URL = 'https://lucyscan.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Páginas protegidas o sin valor SEO — no rastrear
      disallow: [
        '/api/',
        '/analizar',
        '/historial',
        '/olvide-mi-contrasena',
        '/restablecer-contrasena',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
