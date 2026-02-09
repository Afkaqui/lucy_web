'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';

import Noticia_cierre from '@/src/images/noticias/cierre_proyecto.webp';
import Noticia_final from '@/src/images/noticias/final.jpg';
import Noticia_entrevista from '@/src/images/noticias/radio.webp';
import Noticia_Itec from '@/src/images/noticias/ITECLAB.jpg';
import Noticia_Lanza from '@/src/images/noticias/Lanza.jpg';

// --- DATOS (Mantengo tus mismos datos) ---
const news = [
{
    id: 1,
    date: "04 JUL. 2024",
    title: "Lucy parte del programa 'Itec-Lab Market'",
    excerpt: " INCUVAL VENTURES da la bienvenida a todos los participantes que serán parte del programa \"Itec-Lab Market\"💡",
    image: Noticia_Itec,
    link: "https://www.facebook.com/share/p/17oDxwUcSs/"
  },
  {
    id: 2,
    date: "14 JUN. 2024",
    title: "🚀 FINAL DEL PROGRAMA LANZA TU STARTUP 🚀👏",
    excerpt: "Nuestros finalistas presentes dieron su pitch de 3 minutos, haciendo conocer su startup:",
    image: Noticia_final,
    link: "https://www.facebook.com/share/p/1HefnWQejg/"
  },
  {
    id: 3,
    date: "14 JUN. 2024",
    title: "🎉GANADORES🎉 del fondo Lanza tu Startup",
    excerpt: "La Universidad Nacional Hermilio Valdizán consolida su compromiso con el desarrollo educativo regional mediante la firma de un convenio.",
    image: Noticia_Lanza,
    link: "https://www.facebook.com/share/18H6qgeP4i/"
  },
  {
    id: 4,
    date: "19 DIC. 2025",
    title: "Cierre de Proyecto LUCY: resultados de una startup universitaria",
    excerpt: "Se realizó el cierre del Proyecto LUCY, desarrollado por Katerine Soto Ramírez y Ángel Kaqui Aquino, estudiantes de Ingeniería de Sistemas de la UNHEVAL.",
    image: Noticia_cierre, 
    link: "https://www.facebook.com/IncuvalVentures/posts/pfbid035F5VhJH54oa8D29Gs53S1Qiv945W5awhuAr9dG8e4KB6RfLDbe7n9wYREavanqALl"
  },
  {
    id: 5,
    date: "18 DIC. 2025",
    title: "ENTREVISTA LUCY: APLICATIVO PARA LA DETECCIÓN TEMPRANA",
    excerpt: "Entrevista exclusiva en Radio UNHEVAL sobre el impacto del aplicativo móvil en la prevención del cáncer de piel en la región Huánuco.",
    image: Noticia_entrevista,
    link: "https://radio.unheval.edu.pe"
  },
  
];

export const NewsCarousel = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  // --- LÓGICA DE SCROLL SUAVE Y EXACTO ---
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      
      // 1. Obtenemos el ancho exacto de la primera tarjeta visible
      const firstCard = container.firstChild as HTMLDivElement;
      const cardWidth = firstCard?.clientWidth || 300; // Fallback por seguridad
      const gap = 24; // Este valor debe coincidir con 'gap-6' (6 * 4px = 24px)
      
      // 2. Calculamos el desplazamiento exacto (Tarjeta + Gap)
      const scrollAmount = cardWidth + gap;

      // 3. Ejecutamos el scroll suave
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 scroll-smooth" id="noticias">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative group">
        
        {/* Encabezado */}
        <div className="mb-10 px-2">
          <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
            Noticias y <span className="text-blue-700">Eventos</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
        </div>

        {/* --- BOTONES DE NAVEGACIÓN (Mejorados visualmente) --- */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-[60%] -translate-y-1/2 -ml-2 lg:-ml-6 z-20 w-12 h-12 flex items-center justify-center bg-white text-slate-700 rounded-full shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 md:opacity-100"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-[60%] -translate-y-1/2 -mr-2 lg:-mr-6 z-20 w-12 h-12 flex items-center justify-center bg-white text-slate-700 rounded-full shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 md:opacity-100"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>

        {/* --- CONTENEDOR CARRUSEL (Scroll Snap Suave) --- */}
        <div 
          ref={scrollContainer}
          className="
            flex gap-6 overflow-x-auto pb-8 pt-2 px-2
            snap-x snap-mandatory 
            scroll-smooth 
            scrollbar-hide
          "
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' // Habilita scroll con inercia en iOS
          }}
        >
          {news.map((item) => (
            <div 
              key={item.id}
              // Anchos exactos para coincidir con el diseño de tu imagen
              className="
                min-w-[85%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] 
                snap-start 
                bg-white rounded-lg overflow-hidden 
                shadow-sm hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 
                border border-slate-100 flex flex-col h-full
              "
            >
              {/* Imagen con Aspect Ratio controlado */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                  <Calendar size={14} className="text-blue-600" />
                  {item.date}
                </div>

                <Link href={item.link} className="block group/title">
                  <h3 className="text-sm font-extrabold text-slate-800 leading-snug mb-3 uppercase group-hover/title:text-blue-700 transition-colors line-clamp-3 min-h-[3.6em]">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-4 flex-grow">
                  {item.excerpt}
                </p>

                <Link 
                  href={item.link} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide mt-auto border-b border-transparent hover:border-blue-600 pb-0.5 transition-all w-fit"
                >
                  Leer nota completa <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};