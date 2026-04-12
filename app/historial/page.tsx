'use client';

import { useState, useEffect, useCallback } from 'react';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { Clock, AlertTriangle, CheckCircle, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

interface Scan {
  id: string;
  predictedClass: string;
  confidence: number;
  riskLevel: string;
  modelUsed: string;
  gateScore: number | null;
  source: string;
  bodyLocation: string | null;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const RISK_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  high:   { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  medium: { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700' },
  low:    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
};

const RISK_LABEL_ES: Record<string, string> = { high: 'Alto', medium: 'Medio', low: 'Bajo' };

const FRIENDLY_LABELS: Record<string, string> = {
  melanoma: 'Melanoma',
  basal_cell_carcinoma: 'Carcinoma basocelular',
  squamous_cell_carcinoma: 'Carcinoma espinocelular',
  actinic_keratosis: 'Queratosis actínica',
  benign_keratosis: 'Queratosis benigna',
  dermatofibroma: 'Dermatofibroma',
  vascular_lesion: 'Lesión vascular',
  nevus: 'Nevo (Lunar)',
};

const RiskIcon = ({ level }: { level: string }) => {
  if (level === 'high') return <AlertTriangle size={16} className="text-red-500" />;
  if (level === 'medium') return <Activity size={16} className="text-amber-500" />;
  return <CheckCircle size={16} className="text-emerald-500" />;
};

export default function HistorialPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScans = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/scans?page=${page}&limit=10`);
      if (!res.ok) throw new Error('Error al cargar el historial');
      const data = await res.json();
      setScans(data.scans);
      setPagination(data.pagination);
    } catch {
      setError('No se pudo cargar el historial. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <NavBar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Historial de Análisis</h1>
          <p className="text-slate-500 mt-2">Revisa todos tus escaneos anteriores</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
            {error}
          </div>
        )}

        {!loading && !error && scans.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Clock size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Aún no tienes análisis</p>
            <p className="text-sm mt-1">Ve a <a href="/analizar" className="text-emerald-600 underline">Analizar</a> para realizar tu primer escaneo.</p>
          </div>
        )}

        {!loading && scans.length > 0 && (
          <div className="space-y-3">
            {scans.map((scan) => {
              const colors = RISK_COLORS[scan.riskLevel] ?? RISK_COLORS.low;
              return (
                <div
                  key={scan.id}
                  className={`${colors.bg} ${colors.border} border rounded-xl p-4 sm:p-5 transition-shadow hover:shadow-md`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <RiskIcon level={scan.riskLevel} />
                        <span className="font-semibold text-slate-900">
                          {FRIENDLY_LABELS[scan.predictedClass] ?? scan.predictedClass}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span>{formatDate(scan.createdAt)}</span>
                        <span>·</span>
                        <span>Confianza: {(scan.confidence * 100).toFixed(1)}%</span>
                        {scan.bodyLocation && (
                          <>
                            <span>·</span>
                            <span>{scan.bodyLocation}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`${colors.badge} text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>
                      Riesgo {RISK_LABEL_ES[scan.riskLevel] ?? scan.riskLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => fetchScans(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <span className="text-sm text-slate-500">
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchScans(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
