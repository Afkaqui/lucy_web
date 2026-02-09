import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { MissionVision } from '@/components/nosotros/MissionVision';
import { Team } from '@/components/nosotros/Team';

export const metadata = {
  title: 'Nosotros',
  description: 'Conoce al equipo detrás de la tecnología de detección temprana de cáncer de piel.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar />
      
      {/* Hero Interno "Sobre Nosotros" */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        {/* Fondo decorativo abstracto */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Innovando para proteger <span className="text-emerald-400">tu piel</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Nacimos en las aulas de la UNHEVAL con un sueño: utilizar la inteligencia artificial para resolver problemas reales de salud pública en el Perú.
          </p>
        </div>
      </section>

      <MissionVision />
      <Team />

      <Footer />
    </main>
  );
}