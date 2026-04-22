-- Allow DELETE on bookings (admin-only deletion enforced via edge function with service role)
-- The cancel-booking edge function verifies the admin password before deleting,
-- so we don't expose DELETE to public RLS.
-- No RLS policy change needed: service role bypasses RLS automatically.
-- This migration is a no-op marker to document the cancellation feature.
SELECT 1;