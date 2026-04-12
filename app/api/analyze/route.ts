import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const AI_API_URL = process.env.AI_API_URL ?? 'https://ai.lucyscan.com';
const API_SECRET = process.env.API_SECRET ?? '';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { detail: 'No autorizado. Inicia sesión para continuar.' },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const bodyLocation = formData.get('bodyLocation') as string | null;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { detail: 'No se proporcionó ninguna imagen.' },
        { status: 400 },
      );
    }

    const aiForm = new FormData();
    aiForm.append('file', file);

    const response = await fetch(`${AI_API_URL}/predict/phone`, {
      method: 'POST',
      body: aiForm,
      headers: {
        'X-API-Key': API_SECRET,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          detail: data.detail ?? 'Error en la API de IA',
          ...('gate_score' in data && { gate_score: data.gate_score }),
        },
        { status: response.status },
      );
    }

    // Save scan to database
    const scan = await prisma.scan.create({
      data: {
        userId: session.user.id,
        predictedClass: data.predicted_class,
        confidence: data.confidence,
        riskLevel: data.risk_level,
        probabilities: data.probabilities,
        modelUsed: data.model_used ?? 'phone',
        gateScore: data.gate_score ?? null,
        source: 'web',
        bodyLocation: bodyLocation,
        imageSizeKb: file.size ? Math.round(file.size / 1024) : null,
      },
    });

    return NextResponse.json({ ...data, scanId: scan.id });
  } catch {
    return NextResponse.json(
      { detail: 'Error interno al procesar la imagen.' },
      { status: 500 },
    );
  }
}
