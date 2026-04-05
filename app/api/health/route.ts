import { NextResponse } from 'next/server';

const AI_API_URL = process.env.AI_API_URL ?? 'https://ai.lucyscan.com';

export async function GET() {
  try {
    const res = await fetch(`${AI_API_URL}/health`, {
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'No se pudo conectar con la API de IA' },
      { status: 503 },
    );
  }
}
