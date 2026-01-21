import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrackEventPayload {
  event_type: 'page_view' | 'click' | 'scroll' | 'form_submit' | 'external_link';
  page_path: string;
  page_title?: string;
  referrer?: string;
  session_id: string;
  visitor_id: string;
  metadata?: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: TrackEventPayload = await req.json();
    
    // Get user agent and other headers
    const userAgent = req.headers.get('user-agent') || '';
    const referer = req.headers.get('referer') || payload.referrer || '';
    
    // Parse device type from user agent
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';
    
    // Parse browser from user agent
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    console.log(`[track-event] Tracking ${payload.event_type} on ${payload.page_path}`);

    const { error } = await supabase.from('analytics_events').insert({
      event_type: payload.event_type || 'page_view',
      page_path: payload.page_path,
      page_title: payload.page_title,
      referrer: referer,
      user_agent: userAgent,
      session_id: payload.session_id,
      visitor_id: payload.visitor_id,
      metadata: payload.metadata || {},
      device_type: deviceType,
      browser: browser,
    });

    if (error) {
      console.error('[track-event] Error inserting event:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[track-event] Event tracked successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[track-event] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
