import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analizar imagen',
  description: 'Sube una fotografía de tu lesión cutánea y recibe una evaluación de riesgo con IA.',
  robots: { index: false, follow: false },
};

export default function AnalizarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
