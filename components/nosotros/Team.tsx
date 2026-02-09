import Image from 'next/image';
import { Linkedin, Github, Mail } from 'lucide-react';

// Mantenemos tus imports de imágenes
import Katy_image from '@/src/images/equipo/Katy.png';
import Angel_image from '@/src/images/equipo/Angel.png';
import Miguel_image from '@/src/images/equipo/Miguel_blanco.png';
import Alejandra_image from '@/src/images/equipo/Ale.jpeg';

const teamMembers = [
  {
    name: "Katerine Soto Ramírez",
    role: "CEO & Co-Founder",
    bio: "Ganadora del concurso 2G de Innovación. Lideró el desarrollo de soluciones tecnológicas en la UNHEVAL, gestando la visión de LUCY desde los semilleros de investigación.",
    image: Katy_image,
    social: {
      linkedin: "#",
      email: "mailto:katerine@lucyscan.com"
    }
  },
  {
    name: "Angel Kaqui Aquino",
    role: "CTO & Co-Founder",
    bio: "Ganador nacional de la Hackathon Inspiratec 2024 y Gestión Inclusiva 2025. Autor de un artículo en el INS, lidera la visión algorítmica y técnica.",
    image: Angel_image,
    social: {
      linkedin: "#",
      github: "#",
      email: "mailto:angel@lucyscan.com"
    }
  },
  {
    name: "Miguel Rojas",
    role: "Medical Lead",
    bio: "Impulsor de proyectos sociales e investigaciones en oncología en hospitales de Pasco. Aporta el enfoque clínico vital para la validación médica.",
    image: Miguel_image,
    social: {
      linkedin: "#",
      github: "#",
      email: "mailto:miguel@lucyscan.com"
    }
  },
  {
    name: "Alejandra Gerónimo",
    role: "CMO & Strategy",
    bio: "Finalista nacional de la Hackathon Wichay. Especialista en proyectos de concientización en salud y estrategias de crecimiento comercial.",
    image: Alejandra_image,
    social: {
      linkedin: "#",
      email: "mailto:alejandra@lucyscan.com"
    }
  }
];

export const Team = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">El Equipo Ideal</h2>
          <p className="mt-4 text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Nacimos en los semilleros de investigación de la UNHEVAL (2023). Combinamos 
            <span className="font-semibold text-blue-600"> tecnología, salud e investigación </span> 
            con una trayectoria conjunta en proyección social que garantiza un enfoque técnico, clínico y de alto impacto.
          </p>
        </div>

        {/* GRID CONFIG:
           - sm:grid-cols-2: 2 columnas en tablets (2 arriba, 2 abajo).
           - lg:grid-cols-4: 4 columnas en PC (todos en fila).
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 w-full group"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-72 lg:h-80 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  /* OBJECT-TOP: Fuerza a que se vea siempre la cabeza/rostro 
                     y recorte la parte de abajo si sobra imagen.
                  */
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay social */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="p-2 bg-white rounded-full text-slate-900 hover:text-blue-600 hover:scale-110 transition-all">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="p-2 bg-white rounded-full text-slate-900 hover:text-black hover:scale-110 transition-all">
                      <Github size={20} />
                    </a>
                  )}
                  {member.social.email && (
                    <a href={member.social.email} className="p-2 bg-white rounded-full text-slate-900 hover:text-emerald-600 hover:scale-110 transition-all">
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 truncate">{member.name}</h3>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block mt-1 mb-4 truncate">
                  {member.role}
                </span>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};