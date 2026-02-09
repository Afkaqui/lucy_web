import { NavBar } from '@/components/principal/NavBar';
import { Footer } from '@/components/principal/Footer';
import { Shield, Lock, Eye, FileText, Server, Scale } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad | LucyScan',
  description: 'Conoce cómo protegemos tus datos personales y médicos bajo la Ley N° 29733.',
};

export default function PrivacyPage() {
  const lastUpdate = "15 de Febrero, 2026"; // Actualiza esto según corresponda

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar />

      {/* Header de la Página */}
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Shield size={32} />
            <span className="font-bold tracking-wider uppercase text-sm">Centro de Privacidad</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Política de Privacidad y <br />
            <span className="text-blue-600">Protección de Datos</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            En LucyScan, tu salud y tu privacidad son sagradas. Nos comprometemos a proteger tu información médica con los más altos estándares de seguridad y en estricto cumplimiento de la normativa peruana e internacional.
          </p>
          <p className="mt-6 text-sm text-slate-400 font-medium">
            Última actualización: {lastUpdate}
          </p>
        </div>
      </section>

      {/* Contenido Legal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="prose prose-slate prose-lg max-w-none">
            
            {/* 1. Introducción */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <FileText className="text-blue-600" size={24} /> 
                1. Introducción y Marco Legal
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                La presente Política de Privacidad describe cómo <strong>LucyScan</strong> (en adelante, "nosotros" o "la Plataforma") recopila, utiliza y protege la información personal de sus usuarios.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Esta política se rige por la legislación peruana, específicamente la <strong>Ley N° 29733, Ley de Protección de Datos Personales</strong>, y su Reglamento (Decreto Supremo N° 003-2013-JUS). Asimismo, adoptamos principios internacionales de seguridad de la información para garantizar la confidencialidad de los datos de salud.
              </p>
            </div>

            {/* 2. Información que Recopilamos */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <Eye className="text-blue-600" size={24} />
                2. Información que Recopilamos
              </h2>
              <p className="text-slate-600 mb-4">Para brindar nuestro servicio de pre-diagnóstico dermatológico, podemos recopilar los siguientes tipos de datos:</p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600">
                <li>
                  <strong className="text-slate-800">Datos de Identificación:</strong> Nombres, correo electrónico y número de teléfono (solo al registrarse voluntariamente).
                </li>
                <li>
                  <strong className="text-slate-800">Datos Sensibles (Salud/Biométricos):</strong> Imágenes de lesiones cutáneas o lunares capturadas a través de nuestra aplicación. Estos datos son tratados con especial protección.
                </li>
                <li>
                  <strong className="text-slate-800">Datos Técnicos:</strong> Dirección IP, tipo de dispositivo y sistema operativo para fines de seguridad y optimización de la app.
                </li>
              </ul>
            </div>

            {/* 3. Uso de la Información */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <Server className="text-blue-600" size={24} />
                3. Finalidad del Tratamiento de Datos
              </h2>
              <p className="text-slate-600 mb-4">Sus datos serán utilizados estrictamente para:</p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600">
                <li>Procesar el análisis de imágenes mediante nuestros algoritmos de Inteligencia Artificial.</li>
                <li>Entregarle un reporte de evaluación de riesgo (Pre-diagnóstico).</li>
                <li>Mejorar la precisión de nuestro algoritmo (solo si usted otorga su consentimiento explícito para uso anónimo en investigación).</li>
                <li>Cumplir con obligaciones legales o requerimientos de autoridades competentes.</li>
              </ul>
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <p className="text-sm text-emerald-800 font-medium">
                  <strong>Nota Importante:</strong> Las imágenes utilizadas para mejorar nuestra IA son sometidas a un proceso de <strong>anonimización irreversible</strong>, eliminando cualquier rastro que permita identificar al usuario.
                </p>
              </div>
            </div>

            {/* 4. Seguridad y Confidencialidad */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <Lock className="text-blue-600" size={24} />
                4. Seguridad y Confidencialidad
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas, legales y organizativas para evitar la pérdida, mal uso, alteración o robo de sus datos personales.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600">
                <li><strong>Cifrado:</strong> Toda transferencia de datos se realiza bajo protocolos seguros (SSL/TLS).</li>
                <li><strong>Acceso Restringido:</strong> Solo personal autorizado y sujeto a cláusulas de confidencialidad tiene acceso a la base de datos.</li>
                <li><strong>Infraestructura Segura:</strong> Nuestros servidores (VPS) cuentan con firewalls y monitoreo constante.</li>
              </ul>
            </div>

            {/* 5. Derechos ARCO */}
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <Scale className="text-blue-600" size={24} />
                5. Sus Derechos (ARCO)
              </h2>
              <p className="text-slate-600 mb-4">
                Como titular de sus datos personales, usted tiene derecho a acceder, rectificar, cancelar y oponerse (Derechos ARCO) al tratamiento de su información.
              </p>
              <p className="text-slate-600 mb-4">
                Para ejercer estos derechos, puede enviar una solicitud a nuestro Oficial de Protección de Datos al correo:
              </p>
              <a href="mailto:privacidad@lucyscan.com" className="inline-block font-bold text-blue-600 hover:text-blue-800 transition-colors border-b border-blue-200 hover:border-blue-600 pb-0.5">
                privacidad@lucyscan.com
              </a>
              <p className="text-slate-600 mt-4 text-sm">
                Atenderemos su solicitud en los plazos establecidos por la Ley N° 29733.
              </p>
            </div>

            {/* 6. Consentimiento y Menores */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Consentimiento</h2>
              <p className="text-slate-600 leading-relaxed">
                Al utilizar LucyScan, usted declara haber leído esta política y otorga su consentimiento libre, previo, expreso e inequívoco para el tratamiento de sus datos. LucyScan no está dirigido a menores de 18 años sin la supervisión de un tutor legal.
              </p>
            </div>

            {/* 7. Cambios */}
            <div className="mb-0">
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Modificaciones a la Política</h2>
              <p className="text-slate-600 leading-relaxed">
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio sustancial será notificado a través de la aplicación o por correo electrónico.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}