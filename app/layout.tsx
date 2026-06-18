import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from '@/components/auth/SessionProvider';

// Usamos Inter por ser la fuente estándar, limpia y legible para apps médicas
const inter = Inter({ subsets: ['latin'] });

// 1. URL Base del proyecto (Crucial para que funcionen las imágenes en redes sociales)
const BASE_URL = 'https://lucyscan.com';

export const metadata: Metadata = {
  // Configuración del Título
  title: {
    default: 'LucyScan | Pre-diagnóstico Dermatológico con IA',
    template: '%s | LucyScan', // Esto permite que otras páginas se llamen "Analizar | LucyScan"
  },
  
  // Descripción SEO (Max 160 caracteres para Google)
  description: 'Sistema inteligente de detección temprana de cáncer de piel. Utiliza nuestra IA para analizar lunares y recibir una evaluación de riesgo inmediata y privada.',
  
  // Palabras clave para buscadores
  keywords: [
    'dermatología', 
    'inteligencia artificial', 
    'cáncer de piel', 
    'melanoma', 
    'prevención', 
    'salud digital', 
    'tecnología médica', 
    'análisis de lunares',
    'HealthTech'
  ],

  // Información del Autor
  authors: [
    {
      name: 'Angel Kaqui Aquino',
      url: 'https://github.com/Afkaqui/',
    }
  ],
  creator: 'Angel Kaqui Aquino',
  
  // URL Base para resolver rutas relativas
  metadataBase: new URL(BASE_URL),

  // URL canónica — evita contenido duplicado
  alternates: {
    canonical: '/',
  },

  // Categoría e identidad de la aplicación
  applicationName: 'LucyScan',
  category: 'health',

  // Configuración Open Graph (Cómo se ve en Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: 'LucyScan - Tu aliado en la prevención del cáncer de piel',
    description: 'Analiza tus lunares en segundos con Inteligencia Artificial. La detección temprana salva vidas.',
    url: BASE_URL,
    siteName: 'LucyScan - Salud Dermatológica Digital',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Imagen local en el dominio (1200x630)
        width: 1200,
        height: 630,
        alt: 'LucyScan - Análisis dermatológico con IA para detección de cáncer de piel',
      },
    ],
  },

  // Configuración para Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'LucyScan | IA Dermatológica',
    description: 'Pre-diagnóstico de piel rápido y seguro. Escanea, analiza y previene.',
    images: ['/og-image.png'], // Misma imagen local que Open Graph
  },

  // Iconos del navegador
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',    // Icono estándar (ej. 192x192)
    apple: '/apple-icon.png', // Icono para iPhone (ej. 180x180)
  },

  // Control de Robots (Google)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verificación de propiedad (Google Search Console)
  verification: {
    google: '9D8SZV7sxzqoNObLLEvyouk3ij8FajnO-qNwGoA_5yU',
  },
};

// Configuración del Viewport (Zoom y escala en móviles)
// NOTA: no se limita maximumScale para no bloquear el zoom (accesibilidad / SEO)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1b2d', // Navy de marca — barra de navegación en Android Chrome
};

// Datos estructurados (JSON-LD) para Google rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'LucyScan',
      url: BASE_URL,
      logo: `${BASE_URL}/brand/logo-512.png`,
      image: `${BASE_URL}/og-image.png`,
      description:
        'Plataforma peruana de pre-diagnóstico dermatológico con inteligencia artificial para la detección temprana de cáncer de piel.',
      areaServed: { '@type': 'Country', name: 'Perú' },
      knowsAbout: [
        'Cáncer de piel',
        'Melanoma',
        'Dermatología',
        'Detección temprana de lesiones cutáneas',
        'Inteligencia artificial en salud',
      ],
      sameAs: [
        'https://play.google.com/store/apps/dev?id=7276562754339194713',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'LucyScan',
      description: 'Pre-diagnóstico dermatológico con IA — detección temprana de cáncer de piel.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'es-PE',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}