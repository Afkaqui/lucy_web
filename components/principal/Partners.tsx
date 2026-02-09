import Image from 'next/image';

// Mantenemos tus imports originales
import logo_Incuval from '@/src/images/logos/Incuval.webp';
import logo_Lanza from '@/src/images/logos/lanza.png';
import logo_UNHEVAL from '@/src/images/logos/UNHEVAL.png';
import logo_Genes from '@/src/images/logos/Genes.png';
import logo_Atids from '@/src/images/logos/atids.png';
import logo_UNMSM from '@/src/images/logos/UNMSM.png';
import logo_diit from '@/src/images/logos/diit.png';
import logo_diu from '@/src/images/logos/diu.png';
import logo_Manizales from '@/src/images/logos/manizales.png';

const allies = [
  { name: "Incuval", logo: logo_Incuval, width: 140, height: 50 },
  { name: "Lanza", logo: logo_Lanza, width: 120, height: 60 },
  { name: "Unheval", logo: logo_UNHEVAL, width: 100, height: 80 },
  { name: "Genes", logo: logo_Genes, width: 130, height: 40 },
  { name: "Atids", logo: logo_Atids, width: 120, height: 60 },
  { name: "UNMSM", logo: logo_UNMSM, width: 120, height: 60 },
  { name: "DIIT", logo: logo_diit, width: 120, height: 60 },
  { name: "DIU", logo: logo_diu, width: 120, height: 60 },
  { name: "Manizales", logo: logo_Manizales, width: 120, height: 60 }
];

export const Partners = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
          Respaldado por innovación y ciencia
        </p>

        {/* CAMBIO CLAVE: 
           Usamos 'flex flex-wrap justify-center' en lugar de 'grid'.
           'gap-x-12' da espacio horizontal y 'gap-y-12' espacio vertical.
        */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 md:gap-x-16">
          
          {allies.map((ally, index) => (
            <div 
              key={index} 
              // Definimos un ancho base para cada item para mantener uniformidad
              className="group relative w-32 md:w-40 h-24 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Image
                src={ally.logo}
                alt={`Logo de ${ally.name}`}
                // Usamos tamaños un poco más grandes para mejor calidad
                width={160} 
                height={90}
                className="
                  object-contain 
                  max-h-16 md:max-h-20 w-auto 
                  opacity-50 grayscale transition-all duration-500 
                  group-hover:opacity-100 group-hover:grayscale-0
                  filter
                "
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};