-- Drop the problematic UPDATE and DELETE policies
DROP POLICY IF EXISTS "Users can unsubscribe with valid token" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Users can delete subscription with valid token" ON public.newsletter_subscribers;

-- Create a secure helper function to handle unsubscribe via token
-- This function uses SECURITY DEFINER to bypass RLS and validate the token properly
CREATE OR REPLACE FUNCTION public.unsubscribe_with_token(p_token uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated boolean := false;
BEGIN
  -- Validate that token exists and update the record
  UPDATE public.newsletter_subscribers
  SET is_active = false
  WHERE unsubscribe_token = p_token
    AND is_active = true;
  
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  
  RETURN v_updated > 0;
END;
$$;

-- Create a secure helper function to delete subscription via token
CREATE OR REPLACE FUNCTION public.delete_subscription_with_token(p_token uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted boolean := false;
BEGIN
  -- Validate that token exists and delete the record
  DELETE FROM public.newsletter_subscribers
  WHERE unsubscribe_token = p_token;
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  
  RETURN v_deleted > 0;
END;
$$;