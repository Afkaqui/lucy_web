import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scan } from 'lucide-react';
import Fondo from '@/src/images/001Fondo_principal.png';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center">
      
      {/* --- 1. IMAGEN DE FONDO (Estilo XRAI) --- */}
      <div className="absolute inset-0 z-0">
        {/* IMPORTANTE: Asegúrate de tener una imagen 'hero-bg.jpg' en tu carpeta /public 
           o cambia el src por una URL externa de prueba.
        */}
        <Image
          src={Fondo}
          alt="Fondo dermatología tecnológica"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay Oscuro: Esto oscurece la imagen para que el texto blanco se lea perfecto */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      {/* --- 2. CONTENIDO --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20">
        
        <div className="max-w-3xl">
          {/* Subtítulo pequeño (Branding) */}
          <span className="block text-blue-400 font-bold tracking-widest text-sm mb-4 uppercase">
            LUCY — El futuro de la dermatología
          </span>

          {/* Titular Principal (Impacto) */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Analiza. Detecta. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Diagnostica.
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light">
            Detecta riesgos de melanoma y enfermedades cutáneas con la ayuda de inteligencia artificial avanzada. Rápido, preciso y al alcance de tu mano.
          </p>

          {/* Botón Largo (Estilo XRAI) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/analizar" 
              className="w-full sm:w-auto min-w-[200px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Empezar Análisis
            </Link>
            
            <Link 
              href="https://play.google.com/store/apps/dev?id=7276562754339194713" 
              className="w-full sm:w-auto min-w-[200px] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Ver Demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
      
      {/* Decoración inferior (Opcional, para suavizar el corte con la siguiente sección) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};