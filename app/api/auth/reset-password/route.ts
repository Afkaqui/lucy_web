import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body ?? {};

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token requerido.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres.' },
        { status: 400 },
      );
    }

    // Buscar el token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: 'El enlace de recuperación no es válido.' },
        { status: 400 },
      );
    }

    if (resetToken.usedAt) {
      return NextResponse.json(
        { error: 'Este enlace ya fue utilizado. Solicita uno nuevo.' },
        { status: 400 },
      );
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'El enlace expiró. Solicita uno nuevo.' },
        { status: 400 },
      );
    }

    // Verificar que el usuario todavía existe
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    // Hashear nueva contraseña y actualizar en una transacción
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('[reset-password]', error);
    return NextResponse.json(
      { error: 'Error interno. Intenta de nuevo en unos minutos.' },
      { status: 500 },
    );
  }
}
