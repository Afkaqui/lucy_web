import { NextRequest, NextResponse } from 'next/server';

const AI_API_URL = process.env.AI_API_URL ?? 'https://ai.lucyscan.com';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

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
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail ?? 'Error en la API de IA' },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { detail: 'Error interno al procesar la imagen.' },
      { status: 500 },
    );
  }
}
