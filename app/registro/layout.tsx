import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear cuenta gratis',
  description:
    'Regístrate gratis en LucyScan y empieza a analizar tus lunares con inteligencia artificial. La detección temprana de cáncer de piel salva vidas.',
  alternates: { canonical: '/registro' },
};

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
