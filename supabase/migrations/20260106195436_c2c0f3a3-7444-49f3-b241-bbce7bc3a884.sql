-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create a more restrictive policy with email validation
-- This still allows public inserts but with basic constraints
CREATE POLICY "Public newsletter subscription with validation" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (
  -- Ensure email is provided and has valid format (basic check)
  email IS NOT NULL 
  AND length(email) > 5 
  AND length(email) < 255
  AND email LIKE '%@%.%'
  -- Ensure is_active defaults correctly
  AND (is_active IS NULL OR is_active = true)
  -- Ensure source is valid
  AND (source IS NULL OR source = 'website')
);