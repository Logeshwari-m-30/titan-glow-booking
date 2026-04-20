-- Add start_time and end_time columns
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS start_time TIME,
  ADD COLUMN IF NOT EXISTS end_time TIME;

-- Make time_slot optional (legacy)
ALTER TABLE public.bookings
  ALTER COLUMN time_slot DROP NOT NULL;

-- Index to speed up overlap queries
CREATE INDEX IF NOT EXISTS idx_bookings_date_console
  ON public.bookings (booking_date, console_type);
