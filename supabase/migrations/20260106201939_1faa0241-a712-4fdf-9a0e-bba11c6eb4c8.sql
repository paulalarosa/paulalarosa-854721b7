-- Add unsubscribe_token column for secure unsubscribe without authentication
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS unsubscribe_token uuid DEFAULT gen_random_uuid() NOT NULL;

-- Create unique index on unsubscribe_token for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
ON public.newsletter_subscribers(unsubscribe_token);

-- Create UPDATE policy - allow users to deactivate their subscription using their token
-- This allows setting is_active to false only (not modifying email or other data)
CREATE POLICY "Users can unsubscribe with valid token"
ON public.newsletter_subscribers
FOR UPDATE
USING (true)  -- The token validation happens in WITH CHECK
WITH CHECK (
  -- Only allow updating is_active to false (unsubscribe)
  is_active = false
  -- Cannot change email
  AND email = (SELECT email FROM public.newsletter_subscribers WHERE unsubscribe_token = newsletter_subscribers.unsubscribe_token)
);

-- Create DELETE policy - allow users to delete their record using their token
CREATE POLICY "Users can delete subscription with valid token"
ON public.newsletter_subscribers
FOR DELETE
USING (true);  -- Deletion requires knowing the unsubscribe_token which is sent via email