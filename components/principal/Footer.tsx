import Link from 'next/link';
import { Scan, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca y Misión */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group text-white mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                <Scan size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight">LucyScan</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Democratizando el acceso a la detección temprana del melanoma mediante inteligencia artificial. Tecnología que cuida tu piel.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-6">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
              <li><Link href="/#funciona" className="hover:text-emerald-400 transition-colors">Cómo funciona</Link></li>
              <li><Link href="/analizar" className="hover:text-emerald-400 transition-colors">Iniciar Análisis</Link></li>
              <li><Link href="/nosotros" className="hover:text-emerald-400 transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Columna 3: Legal (Importante en Salud) */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacidad" className="hover:text-emerald-400 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-emerald-400 transition-colors">Términos de Uso</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400 transition-colors">Política de Cookies</Link></li>
              <li><Link href="/descargo" className="hover:text-emerald-400 transition-colors">Descargo Médico</Link></li>
            </ul>
          </div>

          {/* Columna 4: Descargo de Responsabilidad Destacado */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
              <Heart size={16} className="fill-emerald-400/20" /> Nota Importante
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              LucyScan es una herramienta de apoyo y pre-diagnóstico. <strong>No sustituye el consejo médico profesional</strong>, diagnóstico o tratamiento. Ante cualquier duda, consulta siempre a un dermatólogo.
            </p>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} LucyScan AI. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              Hecho con <Heart size={12} className="text-red-500 fill-red-500" /> en Perú
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};