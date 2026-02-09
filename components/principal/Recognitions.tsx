import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Award, Newspaper, ArrowUpRight } from 'lucide-react';

// TIPOS DE DATOS
// type: 'image' -> Muestra una tarjeta grande con foto de fondo.
// type: 'link'  -> Muestra una tarjeta minimalista de texto.
const recognitions = [
  {
    id: 1,
    title: "Ganadores Nacionales - Hackathon Inspiratec 2024",
    source: "Concytec / ProCiencia",
    date: "Nov 2024",
    url: "https://ejemplo.com/noticia-inspiratec", // <--- Pon aquí el link real
    image: "/news/inspiratec.jpg", // <--- Necesitas una foto en public/news/
    type: "image"
  },
  {
    id: 2,
    title: "Artículo publicado: Impacto de la IA en dermatología",
    source: "Revista del Instituto Nacional de Salud (INS)",
    date: "Ene 2025",
    url: "https://ejemplo.com/articulo-ins",
    type: "link"
  },
  {
    id: 3,
    title: "Primer Puesto en Gestión Inclusiva con 'LazarIA'",
    source: "Ministerio de la Producción",
    date: "Dic 2025",
    url: "https://ejemplo.com/premio-lazaria",
    image: "/news/lazaria.jpg",
    type: "image"
  },
  {
    id: 4,
    title: "Seleccionados en la II Hackathon de Química Verde",
    source: "BioMulch Andino",
    date: "Feb 2026",
    url: "https://ejemplo.com/quimica-verde",
    type: "link"
  }
];

export const Recognitions = () => {
  return (
    <section className="py-20 bg-slate-50" id="prensa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">
              Trayectoria
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Reconocimientos y Prensa
            </h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm md:text-base">
            El impacto de nuestra tecnología ha sido destacado en diversos medios y concursos de innovación.
          </p>
        </div>

        {/* Grid Híbrido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {recognitions.map((item) => (
            item.type === 'image' ? (
              // --- TARJETA CON IMAGEN (Highlight) ---
              <Link 
                key={item.id}
                href={item.url}
                target="_blank"
                className="group relative col-span-1 md:col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen de Fondo */}
                <Image
                  src={item.image || "/placeholder-news.jpg"} // Fallback si no hay imagen
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradiente (para que se lea el texto) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium backdrop-blur-md border border-emerald-500/30 mb-3">
                        <Award size={12} /> Destacado
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm font-medium">
                        {item.source} • {item.date}
                      </p>
                    </div>
                    
                    {/* Icono de flecha */}
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              // --- TARJETA TIPO ENLACE (Href simple) ---
              <Link 
                key={item.id}
                href={item.url}
                target="_blank"
                className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 h-64 md:h-80"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Newspaper size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {item.date}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 mt-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    Por {item.source}
                  </p>
                </div>
              </Link>
            )
          ))}

        </div>

      </div>
    </section>
  );
};