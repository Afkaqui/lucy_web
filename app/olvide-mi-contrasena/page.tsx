'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { Mail, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

export default function OlvideMiContrasenaPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Error al enviar. Intenta de nuevo.');
        return;
      }

      setSent(true);
    } catch {
      setError('Error de conexión. Intenta de nuevo en unos minutos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-20">
      <NavBar />

      <section className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">

          {sent ? (
            /* Estado: email enviado */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-3">¡Revisa tu correo!</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Si <strong>{email}</strong> está registrado en LucyScan, recibirás
                un enlace para restablecer tu contraseña. Revisa también tu carpeta de spam.
              </p>
              <p className="text-xs text-slate-400 mb-6">El enlace expira en 30 minutos.</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline text-sm"
              >
                <ArrowLeft size={16} />
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            /* Estado: formulario */
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={28} className="text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">¿Olvidaste tu contraseña?</h1>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Ingresa tu correo y te enviaremos un enlace para restablecerla.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      placeholder="tu@correo.com"
                      required
                      autoFocus
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
                  {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:underline"
                >
                  <ArrowLeft size={14} />
                  Volver al inicio de sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
