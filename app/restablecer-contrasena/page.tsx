'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { Lock, CheckCircle, AlertTriangle } from 'lucide-react';

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError('El enlace no es válido. Solicita uno nuevo.');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Error al restablecer. Intenta de nuevo.');
        return;
      }

      setSuccess(true);
      // Redirigir al login después de 3 segundos
      setTimeout(() => router.push('/login'), 3000);
    } catch {
      setError('Error de conexión. Intenta de nuevo en unos minutos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      {success ? (
        /* Estado: éxito */
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">¡Contraseña actualizada!</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Tu contraseña fue restablecida correctamente. Serás redirigido al inicio de sesión en unos segundos.
          </p>
          <Link
            href="/login"
            className="inline-block text-emerald-600 font-semibold hover:underline text-sm"
          >
            Ir al inicio de sesión ahora
          </Link>
        </div>
      ) : !token ? (
        /* Estado: token inválido */
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Enlace inválido</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Este enlace de recuperación no es válido o ya expiró.
          </p>
          <Link
            href="/olvide-mi-contrasena"
            className="inline-block bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-all duration-300"
          >
            Solicitar nuevo enlace
          </Link>
        </div>
      ) : (
        /* Estado: formulario */
        <>
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Nueva contraseña</h1>
            <p className="text-slate-500 text-sm mt-2">
              Elige una contraseña segura para tu cuenta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nueva contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="Repite tu contraseña"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Establecer nueva contraseña'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function RestablecerContrasenaPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-20">
      <NavBar />
      <section className="max-w-md mx-auto px-4 py-16">
        <Suspense fallback={<div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center text-slate-400">Cargando...</div>}>
          <ResetForm />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
