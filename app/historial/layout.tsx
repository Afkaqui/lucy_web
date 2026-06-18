import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Historial de análisis',
  description: 'Revisa el historial de tus escaneos dermatológicos en LucyScan.',
  robots: { index: false, follow: false },
};

export default function HistorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
