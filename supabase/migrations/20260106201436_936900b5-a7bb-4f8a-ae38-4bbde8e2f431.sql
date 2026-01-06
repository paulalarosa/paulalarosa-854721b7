-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON public.newsletter_subscribers;

-- No public SELECT policy needed - only service role should access subscriber data
-- The service role bypasses RLS automatically, so no policy is needed for admin access
-- This effectively blocks all client-side access to reading subscriber emails