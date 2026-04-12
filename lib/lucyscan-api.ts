// Las llamadas pasan por las API Routes de Next.js (/api/analyze, /api/health)
// que actúan como proxy hacia ai.lucyscan.com, evitando problemas de CORS.

export interface AnalysisResult {
  predicted_class: string;
  confidence: number;
  risk_level: 'high' | 'medium' | 'low';
  probabilities: Record<string, number>;
  model: string;
}

const CLASS_LABELS: Record<string, string> = {
  melanoma: 'Posible melanoma',
  basal_cell_carcinoma: 'Posible carcinoma basocelular',
  actinic_keratosis: 'Posible queratosis actínica',
  melanocytic_nevus: 'Lunar común',
  benign_keratosis: 'Lesión benigna',
  dermatofibroma: 'Dermatofibroma',
  vascular_lesion: 'Lesión vascular',
};

const CLASS_TYPE: Record<string, 'maligno' | 'pre-maligno' | 'benigno'> = {
  melanoma: 'maligno',
  basal_cell_carcinoma: 'maligno',
  actinic_keratosis: 'pre-maligno',
  melanocytic_nevus: 'benigno',
  benign_keratosis: 'benigno',
  dermatofibroma: 'benigno',
  vascular_lesion: 'benigno',
};

const RISK_MESSAGES: Record<string, string> = {
  high: 'Consulta a un dermatólogo urgentemente',
  medium: 'Se recomienda revisión médica',
  low: 'Sin señales de alerta visibles',
};

export function getFriendlyLabel(cls: string): string {
  return CLASS_LABELS[cls] ?? cls;
}

export function getClassType(cls: string): string {
  return CLASS_TYPE[cls] ?? 'desconocido';
}

export function getRiskMessage(level: string): string {
  return RISK_MESSAGES[level] ?? '';
}

export class GateRejectionError extends Error {
  gate_score: number;
  constructor(detail: string, gate_score: number) {
    super(detail);
    this.name = 'GateRejectionError';
    this.gate_score = gate_score;
  }
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  if (response.status === 422) {
    const data = await response.json().catch(() => ({ detail: 'Imagen no válida', gate_score: 0 }));
    throw new GateRejectionError(
      data.detail ?? 'La imagen no parece ser una fotografía de piel.',
      data.gate_score ?? 0,
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error de conexión con el servidor' }));
    throw new Error(error.detail ?? `Error ${response.status} al analizar la imagen`);
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health', { signal: AbortSignal.timeout(10000) });
    const data = await res.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}
