import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const allowedOrigins = [
  'https://paulalarosa.com',
  'https://www.paulalarosa.com',
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000'
];

// Helper to get CORS headers based on request origin
const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && allowedOrigins.some(allowed =>
    origin === allowed
  ) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
};

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      console.error('No token provided');
      return new Response(
        JSON.stringify({ success: false, error: 'Token is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'reCAPTCHA not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Verifying reCAPTCHA token...');

    // Verify token with Google
    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();

    console.log('reCAPTCHA verification result:', {
      success: verifyData.success,
      score: verifyData.score,
      action: verifyData.action
    });

    // Check if verification was successful and score is acceptable
    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 0.0 is very likely a bot, 1.0 is very likely a human
    // We'll use 0.5 as the threshold
    if (verifyData.success && verifyData.score >= 0.5) {
      return new Response(
        JSON.stringify({
          success: true,
          score: verifyData.score
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } else {
      console.warn('reCAPTCHA verification failed or low score:', verifyData);
      return new Response(
        JSON.stringify({
          success: false,
          score: verifyData.score,
          error: 'Verification failed - possible bot detected'
        }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Verification error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});