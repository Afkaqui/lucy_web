'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scan, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Cómo funciona', href: '/#funciona' },
  { name: 'Privacidad', href: '/privacidad' },
];

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de colores según el estado
  // Si está arriba: texto blanco. Si baja (scrolled) o abre menú móvil: texto oscuro.
  const isTransparent = !scrolled && !isOpen;
  
  const textColor = isTransparent ? 'text-white' : 'text-slate-800';
  const logoColor = isTransparent ? 'text-white' : 'text-slate-900';
  const hoverColor = isTransparent ? 'hover:text-emerald-300' : 'hover:text-emerald-600';
  const buttonBg = isTransparent ? 'bg-white text-slate-900' : 'bg-slate-900 text-white';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className={`flex items-center gap-2 group transition-colors ${logoColor}`}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg shadow-emerald-500/30">
            <Scan size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight">LucyScan</span>
        </Link>

        {/* MENÚ ESCRITORIO (Hidden en Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors ${textColor} ${hoverColor} ${
                pathname === link.href ? 'font-bold underline underline-offset-4 decoration-emerald-400' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/analizar" 
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${buttonBg} hover:opacity-90`}
          >
            Iniciar App
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (Visible solo en Mobile) */}
        <button 
          className={`md:hidden p-2 rounded-md transition-colors ${textColor}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} className="text-slate-900" /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL (Full Width, Fondo Blanco) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
        isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
      }`}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="text-lg font-medium text-slate-700 hover:text-emerald-600 border-b border-slate-50 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/analizar" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-emerald-600 text-white text-center py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform mt-4"
          >
            Iniciar Análisis Ahora
          </Link>
        </div>
      </div>
    </nav>
  );
};