import type { Metadata } from 'next';
import Image from 'next/image';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { efemerides, type Efemeride } from '@/data/efemerides';

// ---------------------------------------------------------------------------
// Metadata & Open Graph
// ---------------------------------------------------------------------------

const BASE_URL = 'https://lucyscan.com';
const destacada = efemerides.find((e) => e.destacada) ?? efemerides[0];

function buildOgImage(e: Efemeride): string {
  return e.foto ? `${BASE_URL}${e.foto}` : `${BASE_URL}/og-efemerides.png`;
}

export const metadata: Metadata = {
  title: 'Efemérides | LucyScan',
  description: `${destacada.titulo} — ${destacada.nombre}. Celebraciones y momentos especiales del equipo LucyScan.`,
  openGraph: {
    title: `${destacada.titulo} | LucyScan`,
    description: `${destacada.nombre} — Un momento especial del equipo LucyScan.`,
    url: `${BASE_URL}/efemerides`,
    siteName: 'LucyScan',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: buildOgImage(destacada),
        width: 1200,
        height: 630,
        alt: destacada.titulo,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${destacada.titulo} | LucyScan`,
    description: `${destacada.nombre} — Un momento especial del equipo LucyScan.`,
    images: [buildOgImage(destacada)],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TIPO_LABEL: Record<string, string> = {
  cumpleanos: '🎂 Cumpleaños',
  aniversario: '🎉 Aniversario',
  logro: '🏆 Logro',
  bienvenida: '👋 Bienvenida',
  otro: '✨ Efeméride',
};

function formatFecha(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Avatar fallback
// ---------------------------------------------------------------------------

function AvatarInicial({ iniciales }: { iniciales: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-full">
      <span className="text-white font-extrabold text-5xl tracking-wider select-none">
        {iniciales}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tarjeta de efeméride
// ---------------------------------------------------------------------------

function TarjetaEfemeride({ efemeride }: { efemeride: Efemeride }) {
  const { nombre, titulo, mensaje, fecha, foto, iniciales, tipo } = efemeride;

  return (
    <article className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 max-w-2xl w-full mx-auto">

      {/* Banda superior decorativa */}
      <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

      {/* Cuerpo */}
      <div className="px-8 py-10 flex flex-col items-center gap-6 text-center">

        {/* Tipo badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
          {TIPO_LABEL[tipo] ?? TIPO_LABEL.otro}
        </span>

        {/* Foto / Avatar */}
        <div className="relative w-36 h-36 rounded-full ring-4 ring-emerald-400 ring-offset-4 overflow-hidden shadow-lg">
          {foto ? (
            <Image
              src={foto}
              alt={nombre}
              fill
              className="object-cover"
              sizes="144px"
              priority
            />
          ) : (
            <AvatarInicial iniciales={iniciales ?? nombre.slice(0, 2).toUpperCase()} />
          )}
        </div>

        {/* Nombre y título */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {titulo}
          </h2>
          <p className="text-emerald-600 font-semibold text-lg">{nombre}</p>
          <p className="text-slate-400 text-sm">{formatFecha(fecha)}</p>
        </div>

        {/* Separador */}
        <div className="w-16 h-0.5 bg-emerald-200 rounded-full" />

        {/* Mensaje */}
        <div className="text-slate-600 text-base leading-relaxed text-left whitespace-pre-line max-w-lg">
          {mensaje}
        </div>

        {/* Firma LucyScan */}
        <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>Equipo <strong className="text-emerald-600">LucyScan</strong></span>
        </div>
      </div>

      {/* Confeti decorativo (CSS puro) */}
      <div className="absolute top-3 left-6 w-2 h-2 rounded-full bg-emerald-300 opacity-60" />
      <div className="absolute top-6 left-16 w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-70" />
      <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-teal-300 opacity-60" />
      <div className="absolute top-8 right-20 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-50" />
    </article>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EfemeridesPage() {
  const [principal, ...resto] = efemerides;

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar />

      {/* Hero */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-slate-900" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Celebraciones del equipo
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Efemérides <span className="text-emerald-400">LucyScan</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Momentos especiales que compartimos como equipo.
          </p>
        </div>
      </section>

      {/* Efeméride destacada */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <TarjetaEfemeride efemeride={principal} />
        </div>
      </section>

      {/* Efemérides anteriores (si hay más) */}
      {resto.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-slate-700 mb-8 text-center">
              Celebraciones anteriores
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {resto.map((e) => (
                <article
                  key={e.slug}
                  className="bg-slate-50 rounded-2xl p-6 flex items-center gap-4 border border-slate-100 hover:border-emerald-200 transition-colors"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-300 ring-offset-2">
                    {e.foto ? (
                      <Image src={e.foto} alt={e.nombre} fill className="object-cover" sizes="56px" />
                    ) : (
                      <AvatarInicial iniciales={e.iniciales ?? e.nombre.slice(0, 2).toUpperCase()} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{e.nombre}</p>
                    <p className="text-emerald-600 text-xs font-medium">{TIPO_LABEL[e.tipo]}</p>
                    <p className="text-slate-400 text-xs">{formatFecha(e.fecha)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
