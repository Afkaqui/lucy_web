import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'LucyScan <noreply@lucyscan.com>';

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName,
}: {
  to: string;
  resetUrl: string;
  userName?: string | null;
}) {
  const name = userName ?? 'Usuario';

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restablecer contraseña - LucyScan</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:28px 40px;text-align:center;">
              <img src="https://lucyscan.com/logo-email.png"
                   alt="LucyScan"
                   width="52"
                   height="52"
                   style="display:inline-block;vertical-align:middle;margin-right:10px;" />
              <span style="font-size:24px;font-weight:800;color:#10b981;letter-spacing:-0.5px;vertical-align:middle;">Lucy</span><span style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;vertical-align:middle;">Scan</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">Hola, ${name}</p>
              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en LucyScan.
                Si no fuiste tú, puedes ignorar este correo.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${resetUrl}"
                   style="display:inline-block;background:#10b981;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;">
                  Restablecer contraseña
                </a>
              </div>
              <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;line-height:1.6;">
                Este enlace expira en <strong>30 minutos</strong> y solo puede usarse una vez.
              </p>
              <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                Si el botón no funciona, copia y pega esta URL en tu navegador:
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#64748b;word-break:break-all;">
                ${resetUrl}
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} LucyScan · Plataforma de detección de cáncer de piel con IA
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Restablece tu contraseña en LucyScan',
    html,
  });

  if (error) {
    console.error('[email] Error enviando reset email:', error);
    throw new Error('No se pudo enviar el correo de recuperación.');
  }
}
