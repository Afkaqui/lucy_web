import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LucyScan — Pre-diagnóstico Dermatológico con IA',
    short_name: 'LucyScan',
    description:
      'Detección temprana de cáncer de piel con inteligencia artificial. Analiza lunares y lesiones cutáneas y recibe una evaluación de riesgo inmediata.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d1b2d',
    lang: 'es-PE',
    categories: ['health', 'medical', 'lifestyle'],
    icons: [
      { src: '/brand/logo-180.png', sizes: '180x180', type: 'image/png' },
      { src: '/brand/logo-256.png', sizes: '256x256', type: 'image/png' },
      { src: '/brand/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
