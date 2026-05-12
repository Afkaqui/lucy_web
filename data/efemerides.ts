/**
 * LucyScan — Efemérides
 *
 * Agrega nuevas efemérides al inicio del array.
 * La primera entrada es la que se muestra destacada en /efemerides.
 *
 * foto: coloca el archivo en /public/efemerides/ y referencia como "/efemerides/archivo.jpg"
 * Si no hay foto disponible, deja foto: null y se mostrará un avatar con las iniciales.
 */

export type TipoEfemeride = 'cumpleanos' | 'aniversario' | 'logro' | 'bienvenida' | 'otro';

export interface Efemeride {
  slug: string;
  tipo: TipoEfemeride;
  nombre: string;
  titulo: string;
  mensaje: string;
  fecha: string;        // ISO 8601: "2026-05-12"
  foto: string | null;  // ruta en /public, ej: "/efemerides/kevin.jpg"
  iniciales?: string;   // fallback si no hay foto
  destacada: boolean;
}

export const efemerides: Efemeride[] = [
  {
    slug: 'cumpleanos-kevin-2026',
    tipo: 'cumpleanos',
    nombre: 'Kevin Saith Claudio Montes',
    titulo: '¡Feliz cumpleaños, Kevin! 🎂',
    mensaje: `Hoy celebramos el cumpleaños de uno de los integrantes del equipo Lucy.

Kevin, gracias por tu energía, tu compromiso y por ser parte de este sueño que estamos construyendo juntos. Tu aporte hace que LucyScan sea cada día más grande.

¡Que este nuevo año de vida esté lleno de salud, éxito y muchos logros por alcanzar! 🚀

Con cariño, el equipo LucyScan 💚`,
    fecha: '2026-05-12',
    foto: null,
    iniciales: 'KC',
    destacada: true,
  },
];
