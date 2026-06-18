'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity, Users, Layers, Globe } from 'lucide-react';

interface Stats {
  scans: number;
  users: number;
  lesionTypes: number;
  pageViews: number;
}

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, active]);

  return value;
}

function fmt(n: number) {
  return n.toLocaleString('es-PE');
}

// Cuando haya volumen real de datos, poner en true para mostrar
// "Análisis realizados" y "Usuarios registrados".
const SHOW_USAGE_STATS = false;

function StatCard({
  icon,
  value,
  label,
  suffix = '',
  active,
  accent,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  active: boolean;
  accent: string;
}) {
  const count = useCountUp(value, 1800, active);

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/8">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
        {fmt(count)}{suffix}
      </span>
      <span className="text-sm font-medium text-slate-400 text-center leading-snug">{label}</span>
    </div>
  );
}

export function StatsCounter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch stats (also increments page views server-side)
  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {
        setStats({ scans: 0, users: 0, lesionTypes: 7, pageViews: 0 });
      });
  }, []);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scans       = stats?.scans       ?? 0;
  const users       = stats?.users       ?? 0;
  const lesions     = stats?.lesionTypes ?? 7;
  const pageViews   = stats?.pageViews   ?? 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d1b2d] overflow-hidden py-20 px-4"
    >
      {/* Decoración: punto de luz difuso */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>
      {/* Línea verde superior */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-32 h-[3px] bg-emerald-500 rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Impacto real
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            LucyScan en números
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
            Cada análisis es una persona que tomó el primer paso hacia el diagnóstico temprano.
          </p>
        </div>

        {/* Grid de estadísticas */}
        <div
          className={`grid grid-cols-2 gap-4 ${
            SHOW_USAGE_STATS ? 'lg:grid-cols-4' : 'max-w-2xl mx-auto'
          }`}
        >
          {SHOW_USAGE_STATS && (
            <>
              <StatCard
                icon={<Activity size={22} className="text-emerald-400" />}
                value={scans}
                label="Análisis realizados"
                active={visible}
                accent="bg-emerald-500/15"
              />
              <StatCard
                icon={<Users size={22} className="text-blue-400" />}
                value={users}
                label="Usuarios registrados"
                active={visible}
                accent="bg-blue-500/15"
              />
            </>
          )}
          <StatCard
            icon={<Layers size={22} className="text-teal-400" />}
            value={lesions}
            label="Tipos de lesiones detectadas"
            active={visible}
            accent="bg-teal-500/15"
          />
          <StatCard
            icon={<Globe size={22} className="text-violet-400" />}
            value={pageViews}
            label="Visitas a la plataforma"
            active={visible}
            accent="bg-violet-500/15"
          />
        </div>

        {/* Nota al pie */}
        <p className="text-center text-xs text-slate-600 mt-10">
          Datos en tiempo real · Solo orientativo, no reemplaza al dermatólogo
        </p>
      </div>
    </section>
  );
}
