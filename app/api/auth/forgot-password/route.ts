import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

// Respuesta genérica — nunca revelar si el email existe o no
const OK_RESPONSE = NextResponse.json({
  message: 'Si ese correo existe en nuestra plataforma, recibirás un enlace de recuperación.',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body?.email ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Correo inválido.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Si no existe, respondemos igual (seguridad — no revelar si el email está registrado)
    if (!user) return OK_RESPONSE;

    // Invalidar tokens previos no usados para este email
    await prisma.passwordResetToken.updateMany({
      where: { email, usedAt: null },
      data: { usedAt: new Date() },
    });

    // Generar token seguro
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

    await prisma.passwordResetToken.create({
      data: { token, email, expiresAt },
    });

    const baseUrl = process.env.NEXTAUTH_URL ?? 'https://lucyscan.com';
    const resetUrl = `${baseUrl}/restablecer-contrasena?token=${token}`;

    await sendPasswordResetEmail({
      to: email,
      resetUrl,
      userName: user.name,
    });

    return OK_RESPONSE;
  } catch (error) {
    console.error('[forgot-password]', error);
    return NextResponse.json(
      { error: 'Error interno. Intenta de nuevo en unos minutos.' },
      { status: 500 },
    );
  }
}
