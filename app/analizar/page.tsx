'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { Upload, X, Loader2, CheckCircle, AlertTriangle, ChevronRight, Activity, Lock, Key } from 'lucide-react';

export default function AnalizarPage() {
  // --- CONFIGURACIÓN DEL TOKEN ---
  const DEMO_TOKEN = "LUCY2026"; // <--- ¡CAMBIA ESTO POR TU CONTRASEÑA!

  // --- ESTADOS ---
  const [isLocked, setIsLocked] = useState(true); // Empieza bloqueado
  const [tokenInput, setTokenInput] = useState("");
  const [tokenError, setTokenError] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [resultData, setResultData] = useState<{ score: number; label: string; risk: 'bajo' | 'medio' | 'alto' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MANEJADOR DE DESBLOQUEO ---
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim().toUpperCase() === DEMO_TOKEN) {
      setIsLocked(false); // Desbloquear
      setTokenError(false);
    } else {
      setTokenError(true); // Mostrar error
      // Pequeña vibración visual (opcional si usas librerías, aquí solo error rojo)
    }
  };

  // --- MANEJADORES DE IMAGEN ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };


  // --- SIMULACIÓN DEL ALGORITMO ---
  const startAnalysis = () => {
    if (!image) return;

    setStatus('uploading');
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8; // Un poco más lento para dar tensión
      
      if (currentProgress < 30) {
        setStatus('uploading');
        setAnalysisStep('Encriptando y subiendo a VPS seguro...');
      } else if (currentProgress < 60) {
        setStatus('analyzing');
        setAnalysisStep('Ejecutando modelo CNN (LUCY-v2)...');
      } else if (currentProgress < 85) {
        setAnalysisStep('Verificando asimetría y bordes...');
      } else {
        setAnalysisStep('Calculando índice de riesgo...');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        finalizeAnalysis();
      } else {
        setProgress(Math.min(currentProgress, 99));
      }
    }, 300);
  };

  // Variable para guardar el nombre del archivo (añade esto arriba con los otros estados)
  const [fileName, setFileName] = useState(""); 

  // --- Actualiza tus manejadores de archivos para guardar el nombre ---

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name.toLowerCase()); // <--- Guardamos el nombre
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  // --- LÓGICA "TRUCADA" PARA DEMOS ---
  const finalizeAnalysis = () => {
    setProgress(100);
    
    let score = 0;
    let risk: 'bajo' | 'medio' | 'alto' = 'bajo';
    let label = '';

    // Lógica determinista basada en el nombre del archivo
    if (fileName.includes('peligro') || fileName.includes('alto') || fileName.includes('melanoma')) {
      // CASO FORZADO: RIESGO ALTO
      score = Math.floor(Math.random() * (99 - 85) + 85); // Entre 85 y 99
      risk = 'alto';
      label = 'Alta Probabilidad de Melanoma';
    } else if (fileName.includes('medio') || fileName.includes('atypical')) {
      // CASO FORZADO: RIESGO MEDIO
      score = Math.floor(Math.random() * (70 - 50) + 50); // Entre 50 y 70
      risk = 'medio';
      label = 'Lesión Atípica (Consultar)';
    } else if (fileName.includes('sano') || fileName.includes('bajo') || fileName.includes('benigno')) {
      // CASO FORZADO: RIESGO BAJO
      score = Math.floor(Math.random() * (20 - 5) + 5); // Entre 5 y 20
      risk = 'bajo';
      label = 'Benigno (Nevus)';
    } else {
      // CASO ALEATORIO (Para cualquier otra foto)
      score = Math.floor(Math.random() * (95 - 10) + 10);
      if (score > 50 && score < 75) {
        risk = 'medio';
        label = 'Lesión Atípica (Consultar)';
      } else if (score >= 75) {
        risk = 'alto';
        label = 'Alta Probabilidad de Melanoma';
      } else {
        risk = 'bajo';
        label = 'Benigno (Nevus)';
      }
    }

    setResultData({
      score: score,
      label: label,
      risk: risk
    });

    setTimeout(() => {
      setStatus('result');
    }, 500);
  };

  const resetAnalysis = () => {
    setImage(null);
    setStatus('idle');
    setResultData(null);
    setProgress(0);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-20 relative">
      <NavBar />

      {/* --- MODAL DE BLOQUEO (TOKEN GATE) --- */}
      {isLocked && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-500">
                <Lock size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Acceso Restringido</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Esta es una versión demo privada de LucyScan. Por favor, ingresa tu token de acceso para continuar.
              </p>

              <form onSubmit={handleUnlock} className="w-full">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                      tokenError 
                        ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-200' 
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                    }`}
                    placeholder="Token de acceso"
                    autoFocus
                  />
                </div>
                
                {tokenError && (
                  <p className="text-red-500 text-xs font-bold mb-4 animate-pulse">
                    Token incorrecto. Inténtalo de nuevo.
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 active:scale-95"
                >
                  Desbloquear Demo
                </button>
              </form>
              
              <p className="mt-6 text-xs text-slate-400">
                Solicita acceso en <span className="font-mono text-slate-500">lucyia364@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENIDO PRINCIPAL (Se ve borroso si isLocked es true, pero el modal lo tapa) --- */}
      <section className="max-w-5xl mx-auto px-4 py-12 min-h-[80vh] flex flex-col justify-center">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Análisis Inteligente <span className="text-emerald-600">LucyScan</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Sube una fotografía clara de la lesión cutánea. Nuestra IA procesará la imagen en nuestros servidores seguros para detectar patrones de riesgo.
          </p>
        </div>

        {/* 1. SUBIR IMAGEN */}
        {status === 'idle' && (
          <div 
            className={`
              relative w-full max-w-2xl mx-auto h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer bg-white
              ${isDragging ? 'border-emerald-500 bg-emerald-50 scale-[1.02]' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isLocked && fileInputRef.current?.click()} // Evita click si está bloqueado
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            {!image ? (
              <>
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
                  <Upload size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700">Haz clic o arrastra tu imagen aquí</p>
                <p className="text-sm text-slate-400 mt-2">Soporta JPG, PNG (Máx 5MB)</p>
              </>
            ) : (
              <div className="relative w-full h-full p-4 group">
                <Image src={image} alt="Preview" fill className="object-contain rounded-2xl" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">Cambiar imagen</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTÓN INICIAR */}
        {status === 'idle' && image && (
          <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={startAnalysis}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-4 px-12 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1 flex items-center gap-2 mx-auto"
            >
              <Activity size={20} />
              Analizar con IA
            </button>
          </div>
        )}

        {/* 2. PROCESANDO */}
        {(status === 'uploading' || status === 'analyzing') && (
          <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
               <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xl font-bold text-slate-700">{Math.round(progress)}%</span>
               </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analizando...</h3>
            <p className="text-slate-500 mb-6 min-h-[1.5em] transition-all font-mono text-sm">{analysisStep}</p>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* 3. RESULTADOS */}
        {status === 'result' && resultData && (
          <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px] md:min-h-full p-4 flex items-center justify-center">
                <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-inner border border-white">
                  {image && <Image src={image} alt="Analizada" fill className="object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent opacity-50"></div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Resultado del Análisis</span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">v2.1-beta</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-extrabold ${
                      resultData.risk === 'bajo' ? 'text-emerald-500' : 
                      resultData.risk === 'medio' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {resultData.score}%
                    </span>
                    <span className="text-slate-400 font-medium">probabilidad</span>
                  </div>
                  <h2 className={`text-2xl font-bold mt-2 ${
                    resultData.risk === 'bajo' ? 'text-emerald-700' : 
                    resultData.risk === 'medio' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {resultData.label}
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Simetría</span>
                    <span className="font-semibold text-slate-700">{resultData.risk === 'bajo' ? 'Regular' : 'Irregular'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Bordes</span>
                    <span className="font-semibold text-slate-700">{resultData.risk === 'bajo' ? 'Definidos' : 'Difusos'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Diámetro</span>
                    <span className="font-semibold text-slate-700">{resultData.risk === 'bajo' ? '< 6mm' : '> 6mm'}</span>
                  </div>
                </div>

                <button onClick={resetAnalysis} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Analizar otra imagen <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}