import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/principal/Hero';
import { HowItWorks} from '@/components/principal/HowItWorks';

import Image from 'next/image';
import { Scan, Activity, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar />
      
      {/* 1. SECCIÓN HERO (Full Screen) */}
      <Hero />
      <HowItWorks />
      

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} LucyScan. Herramienta de apoyo, no sustituye al médico.
          </p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition">Términos</a>
            <a href="#" className="hover:text-emerald-600 transition">Privacidad</a>
          </div>
        </div>
      </footer>

    </main>
  );
}