import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const allowedOrigins = [
  "https://paulalarosa.com",
  "https://www.paulalarosa.com",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

// HTML body — kept narrow (640px) for legacy clients, inline styles for max compat.
const buildHtml = (email: string) => `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bem-vinda à newsletter</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Inter','Segoe UI',Arial,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#111111;border:1px solid #1f1f1f;border-radius:16px;padding:40px 32px;">
          <tr>
            <td>
              <p style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#a3a3a3;margin:0 0 8px;">PAULA LA ROSA</p>
              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;line-height:1.15;color:#ffffff;margin:0 0 16px;">
                Pronto. Você está dentro.
              </h1>
              <p style="font-size:15px;line-height:1.65;color:rgba(255,255,255,0.78);margin:0 0 16px;">
                Obrigada por assinar. Você receberá <strong>um email por mês</strong> com padrões,
                decisões técnicas e bastidores de projetos reais — nada de fluff motivacional.
              </p>
              <p style="font-size:15px;line-height:1.65;color:rgba(255,255,255,0.78);margin:0 0 24px;">
                Enquanto isso, vale dar uma olhada nos cases:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="background:#ffffff;border-radius:999px;">
                    <a href="https://paulalarosa.com/#portfolio" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#0a0a0a;text-decoration:none;">
                      Ver os cases
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size:12px;line-height:1.6;color:rgba(255,255,255,0.45);margin:24px 0 0;border-top:1px solid #1f1f1f;padding-top:20px;">
                Sem spam. Sem listas vendidas. Cancele com 1 clique quando quiser.
                <br /><br />
                Recebeu este email por engano? Responda esta mensagem e eu removo o cadastro de
                <span style="color:rgba(255,255,255,0.6);">${email}</span> manualmente.
                <br /><br />
                Paula La Rosa — Rio de Janeiro 🇧🇷<br />
                <a href="https://paulalarosa.com" style="color:#a3a3a3;text-decoration:none;">paulalarosa.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const buildText = (email: string) => `Pronto. Você está dentro.

Obrigada por assinar. Você receberá UM email por mês com padrões, decisões
técnicas e bastidores de projetos reais — nada de fluff motivacional.

Enquanto isso, vale dar uma olhada nos cases:
https://paulalarosa.com/#portfolio

Sem spam. Sem listas vendidas. Cancele com 1 clique quando quiser.

Recebeu este email por engano? Responda esta mensagem e eu removo o cadastro
de ${email} manualmente.

Paula La Rosa — Rio de Janeiro 🇧🇷
https://paulalarosa.com`;

serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  let body: { email?: string } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "invalid email" }), {
      status: 422,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress = Deno.env.get("NEWSLETTER_FROM") ?? "Paula La Rosa <hello@paulalarosa.com>";

  if (!resendApiKey) {
    // Function is callable but unconfigured. Return 200 so the signup flow
    // never breaks during local dev / preview deploys.
    return new Response(
      JSON.stringify({ ok: true, sent: false, reason: "RESEND_API_KEY not set" }),
      { status: 200, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: "Pronto. Você está dentro.",
      html: buildHtml(email),
      text: buildText(email),
      tags: [{ name: "category", value: "newsletter_welcome" }],
    }),
  });

  if (!resendRes.ok) {
    const errorText = await resendRes.text();
    return new Response(
      JSON.stringify({ ok: false, error: "send failed", detail: errorText }),
      { status: 502, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  const data = await resendRes.json();
  return new Response(JSON.stringify({ ok: true, sent: true, id: data.id }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
