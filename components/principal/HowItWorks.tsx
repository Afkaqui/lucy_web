import { Scan, Activity, ShieldCheck } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <section id="funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado de la Sección */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            Proceso Simple
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Tecnología médica en tu bolsillo
          </p>
          <p className="mt-4 text-xl text-slate-500">
            Tres pasos sencillos para obtener un pre-diagnóstico impulsado por IA.
          </p>
        </div>

        {/* Grid de Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1: Captura */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100 text-center md:text-left group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform">
              <Scan size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Captura</h3>
            <p className="text-slate-500 leading-relaxed">
              Toma una foto clara de tu lunar o lesión cutánea directamente con la cámara de tu móvil.
            </p>
          </div>

          {/* Card 2: Análisis */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100 text-center md:text-left group">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform">
              <Activity size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Análisis IA</h3>
            <p className="text-slate-500 leading-relaxed">
              Nuestros algoritmos analizan la asimetría, bordes, color y diámetro en segundos.
            </p>
          </div>

          {/* Card 3: Resultados */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100 text-center md:text-left group">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Resultados</h3>
            <p className="text-slate-500 leading-relaxed">
              Recibe una evaluación de riesgo inmediata y recomendaciones para visitar a un especialista.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};