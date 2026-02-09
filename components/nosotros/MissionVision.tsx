import { Target, Telescope, Lightbulb } from 'lucide-react';

export const MissionVision = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
            Nuestra Esencia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
            Impulsados por la ciencia, motivados por la vida
          </h2>
          <p className="text-slate-500 text-lg">
            En LucyScan, creemos que la tecnología no debe reemplazar al médico, sino potenciar su capacidad para salvar vidas mediante la detección temprana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* MISIÓN */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-2xl group-hover:bg-blue-200 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 border border-blue-50">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h3>
              <p className="text-slate-600 leading-relaxed">
                Democratizar el acceso al pre-diagnóstico dermatológico en Latinoamérica. Desarrollamos herramientas de Inteligencia Artificial accesibles y precisas que empoderan a las personas para tomar el control de su salud cutánea, facilitando la detección temprana del melanoma en zonas con escaso acceso a especialistas.
              </p>
            </div>
          </div>

          {/* VISIÓN */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-100 rounded-full opacity-50 blur-2xl group-hover:bg-emerald-200 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-6 border border-emerald-50">
                <Telescope size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Visión</h3>
              <p className="text-slate-600 leading-relaxed">
                Ser el referente líder en salud digital dermatológica en la región para el 2030. Aspiramos a crear un ecosistema donde la prevención sea proactiva, reduciendo drásticamente la tasa de mortalidad por cáncer de piel mediante la sinergia entre pacientes, tecnología e instituciones médicas.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};