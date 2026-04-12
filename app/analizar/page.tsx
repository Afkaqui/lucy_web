'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import {
  Upload, X, CheckCircle, AlertTriangle, ChevronRight,
  Activity, Lock, Key, Shield, Info, BarChart3, RefreshCw,
} from 'lucide-react';
import {
  analyzeImage, checkHealth, getFriendlyLabel, getClassType, getRiskMessage,
  GateRejectionError,
  type AnalysisResult,
} from '@/lib/lucyscan-api';

// --- Constantes de UI ---
const RISK_COLORS = {
  high:   { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    accent: 'text-red-500',    badge: 'bg-red-100 text-red-700' },
  medium: { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700',  accent: 'text-amber-500',  badge: 'bg-amber-100 text-amber-700' },
  low:    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', accent: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
};

const RISK_LABEL_ES: Record<string, string> = { high: 'Alto', medium: 'Medio', low: 'Bajo' };

export default function AnalizarPage() {
  const DEMO_TOKEN = "LUCY2026";

  // --- Estados ---
  const [isLocked, setIsLocked] = useState(true);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenError, setTokenError] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result' | 'error' | 'gate_rejected'>('idle');
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Health check al desbloquear ---
  useEffect(() => {
    if (!isLocked) {
      checkHealth().then(setApiOnline);
    }
  }, [isLocked]);

  // --- Cleanup ---
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  // --- Token gate ---
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim().toUpperCase() === DEMO_TOKEN) {
      setIsLocked(false);
      setTokenError(false);
    } else {
      setTokenError(true);
    }
  };

  // --- Manejo de archivos ---
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  // --- Análisis real ---
  const startAnalysis = async () => {
    if (!imageFile) return;

    setStatus('analyzing');
    setProgress(0);
    setErrorMsg('');
    setResult(null);

    // Progreso visual simulado mientras la API responde
    const steps = [
      { at: 10, text: 'Subiendo imagen al servidor seguro...' },
      { at: 35, text: 'Ejecutando modelo EfficientNet-B0...' },
      { at: 60, text: 'Analizando patrones ABCD...' },
      { at: 80, text: 'Calculando probabilidades por clase...' },
    ];

    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += Math.random() * 4 + 1;
      if (currentProgress > 90) currentProgress = 90; // Se queda en 90 hasta que la API responda
      setProgress(currentProgress);

      const step = [...steps].reverse().find(s => currentProgress >= s.at);
      if (step) setAnalysisStep(step.text);
    }, 200);

    try {
      const data = await analyzeImage(imageFile);

      // API respondió — completar barra
      if (progressInterval.current) clearInterval(progressInterval.current);
      setProgress(100);
      setAnalysisStep('Análisis completado');
      setResult(data);

      setTimeout(() => setStatus('result'), 600);
    } catch (err: unknown) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (err instanceof GateRejectionError) {
        setErrorMsg(err.message);
        setStatus('gate_rejected');
      } else {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        setErrorMsg(message);
        setStatus('error');
      }
    }
  };

  const resetAnalysis = () => {
    setImageFile(null);
    setImagePreview(null);
    setStatus('idle');
    setResult(null);
    setProgress(0);
    setErrorMsg('');
  };

  // --- Helpers de renderizado ---
  const sortedProbabilities = result
    ? Object.entries(result.probabilities).sort(([, a], [, b]) => b - a)
    : [];

  const colors = result ? RISK_COLORS[result.risk_level] : RISK_COLORS.low;

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-20 relative">
      <NavBar />

      {/* ===== MODAL TOKEN GATE ===== */}
      {isLocked && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-500">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Acceso Restringido</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Esta es una versión demo de LucyScan. Ingresa tu token de acceso para continuar.
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

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <section className="max-w-5xl mx-auto px-4 py-12 min-h-[80vh] flex flex-col justify-center">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Análisis Inteligente <span className="text-emerald-600">LucyScan</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Sube una fotografía clara de la lesión cutánea. Nuestra IA procesará la imagen en tiempo real para detectar patrones de riesgo.
          </p>

          {/* Estado de la API */}
          {apiOnline !== null && (
            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-xs font-medium ${
              apiOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              {apiOnline ? 'API conectada' : 'API no disponible'}
            </div>
          )}
        </div>

        {/* ===== 1. SUBIR IMAGEN ===== */}
        {status === 'idle' && (
          <div
            className={`
              relative w-full max-w-2xl mx-auto h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer bg-white
              ${isDragging ? 'border-emerald-500 bg-emerald-50 scale-[1.02]' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isLocked && fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            {!imagePreview ? (
              <>
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
                  <Upload size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700">Haz clic o arrastra tu imagen aquí</p>
                <p className="text-sm text-slate-400 mt-2">Soporta JPG, PNG, WEBP (Máx 20MB)</p>
              </>
            ) : (
              <div className="relative w-full h-full p-4 group">
                <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-2xl" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">Cambiar imagen</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón analizar */}
        {status === 'idle' && imagePreview && (
          <div className="text-center mt-8">
            <button
              onClick={startAnalysis}
              disabled={apiOnline === false}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 px-12 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1 flex items-center gap-2 mx-auto"
            >
              <Activity size={20} />
              Analizar con IA
            </button>
            {apiOnline === false && (
              <p className="text-red-500 text-sm mt-3">
                La API no está disponible en este momento. Intenta más tarde.
              </p>
            )}
          </div>
        )}

        {/* ===== 2. PROCESANDO ===== */}
        {status === 'analyzing' && (
          <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-700">{Math.round(progress)}%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analizando...</h3>
            <p className="text-slate-500 mb-6 min-h-[1.5em] font-mono text-sm">{analysisStep}</p>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ===== 3. ERROR ===== */}
        {status === 'error' && (
          <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-3xl shadow-lg border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Error en el análisis</h3>
            <p className="text-slate-500 mb-6 text-sm">{errorMsg}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={startAnalysis}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} /> Reintentar
              </button>
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
              >
                Nueva imagen
              </button>
            </div>
          </div>
        )}

        {/* ===== 3b. GATE REJECTION ===== */}
        {status === 'gate_rejected' && (
          <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-3xl shadow-lg border border-amber-100 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Imagen no válida</h3>
            <p className="text-slate-500 mb-2 text-sm">
              Esta imagen no parece ser una fotografía de piel o lesión cutánea.
            </p>
            <p className="text-slate-400 mb-6 text-xs">
              Por favor sube una foto clara de la lesión que deseas analizar.
            </p>
            <button
              onClick={resetAnalysis}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} /> Subir otra imagen
            </button>
          </div>
        )}

        {/* ===== 4. RESULTADOS ===== */}
        {status === 'result' && result && (
          <div className="max-w-4xl mx-auto w-full space-y-6">

            {/* Card principal */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="flex flex-col md:flex-row">

                {/* Imagen analizada */}
                <div className="w-full md:w-5/12 bg-slate-100 relative min-h-[300px] p-4 flex items-center justify-center">
                  <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-inner border border-white">
                    {imagePreview && <Image src={imagePreview} alt="Analizada" fill className="object-cover" />}
                  </div>
                </div>

                {/* Resultado */}
                <div className="w-full md:w-7/12 p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Resultado del Análisis</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                      Riesgo {RISK_LABEL_ES[result.risk_level]}
                    </span>
                  </div>

                  {/* Clase predicha */}
                  <div className="mb-6">
                    <h2 className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
                      {getFriendlyLabel(result.predicted_class)}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-4xl font-extrabold ${colors.accent}`}>
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                      <span className="text-slate-400 text-sm">de confianza</span>
                    </div>
                    <p className={`mt-2 text-sm font-medium ${colors.text}`}>
                      {getRiskMessage(result.risk_level)}
                    </p>
                  </div>

                  {/* Tipo de lesión */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold mb-6 ${
                    getClassType(result.predicted_class) === 'benigno' ? 'bg-emerald-50 text-emerald-700' :
                    getClassType(result.predicted_class) === 'pre-maligno' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {getClassType(result.predicted_class) === 'benigno' ? <CheckCircle size={14} /> :
                     <AlertTriangle size={14} />}
                    Tipo: {getClassType(result.predicted_class)}
                  </div>

                  {/* Botón */}
                  <button
                    onClick={resetAnalysis}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Analizar otra imagen <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Distribución de probabilidades */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={20} className="text-slate-500" />
                <h3 className="font-bold text-slate-900">Distribución de Probabilidades</h3>
              </div>
              <div className="space-y-3">
                {sortedProbabilities.map(([cls, prob]) => {
                  const isTop = cls === result.predicted_class;
                  const pct = (prob * 100).toFixed(1);
                  const barColor =
                    cls === 'melanoma' || cls === 'basal_cell_carcinoma' ? 'bg-red-500' :
                    cls === 'actinic_keratosis' ? 'bg-amber-500' : 'bg-emerald-500';

                  return (
                    <div key={cls} className={`rounded-xl p-3 transition-colors ${isTop ? 'bg-slate-50 ring-1 ring-slate-200' : ''}`}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-sm ${isTop ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                          {getFriendlyLabel(cls)}
                        </span>
                        <span className={`text-sm font-mono ${isTop ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${isTop ? barColor : 'bg-slate-300'}`}
                          style={{ width: `${Math.max(parseFloat(pct), 0.5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <Shield size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Aviso Importante</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Este análisis es orientativo y <strong>no reemplaza el diagnóstico de un médico dermatólogo</strong>.
                  Si el resultado indica riesgo medio o alto, consulta con un especialista lo antes posible.
                  La detección temprana salva vidas.
                </p>
              </div>
            </div>

            {/* Info técnica */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pb-4">
              <span className="flex items-center gap-1">
                <Info size={12} /> Modelo: {result.model}
              </span>
              <span>|</span>
              <span>EfficientNet-B0 + ONNX Runtime</span>
              <span>|</span>
              <span>7 clases</span>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
