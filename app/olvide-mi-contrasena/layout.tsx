import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Solicita un enlace para restablecer la contraseña de tu cuenta de LucyScan.',
  robots: { index: false, follow: false },
};

export default function OlvideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
