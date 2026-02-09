import { NavBar } from '@/components/principal/NavBar';
import { Hero } from '@/components/principal/Hero';
import { HowItWorks} from '@/components/principal/HowItWorks';
import { Footer } from '@/components/principal/Footer';
import { Partners } from '@/components/principal/Partners';
import {Recognitions} from '@/components/principal/Recognitions';
import { NewsCarousel } from '@/components/principal/NewCarrusel';


import Image from 'next/image';
import { Scan, Activity, ShieldCheck, Import } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar />
      
      {/* 1. SECCIÓN HERO (Full Screen) */}
      <Hero />
      <HowItWorks />
      <Partners />
      <NewsCarousel />
      
      <Footer />

    </main>
  );
}