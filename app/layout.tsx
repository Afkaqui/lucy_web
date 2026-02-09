import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

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
        url: '/logo_metadatos.png', // Tienes que crear esta imagen (ver nota abajo)
        width: 1200,
        height: 630,
        alt: 'LucyScan - Interfaz de análisis dermatológico con IA',
      },
    ],
  },

  // Configuración para Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'LucyScan | IA Dermatológica',
    description: 'Pre-diagnóstico de piel rápido y seguro. Escanea, analiza y previene.',
    images: ['/og-image.jpg'], // Reusa la misma imagen
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
    google: 'TU_CODIGO_DE_VERIFICACION_GOOGLE', // <--- PENDIENTE: Reemplazar cuando lo tengas
  },
};

// Configuración del Viewport (Zoom y escala en móviles)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff', // Color de la barra de navegación en Android Chrome
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <meta name="google-site-verification" content="9D8SZV7sxzqoNObLLEvyouk3ij8FajnO-qNwGoA_5yU" />
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}