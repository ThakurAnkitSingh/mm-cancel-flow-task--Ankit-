-- Add extra columns to store full flow details

DO $$ BEGIN
  ALTER TABLE public.cancellations
    ADD COLUMN IF NOT EXISTS found_job_with_migrate_mate BOOLEAN,
    ADD COLUMN IF NOT EXISTS roles_applied INTEGER,
    ADD COLUMN IF NOT EXISTS companies_emailed INTEGER,
    ADD COLUMN IF NOT EXISTS companies_interviewed INTEGER,
    ADD COLUMN IF NOT EXISTS has_immigration_lawyer BOOLEAN,
    ADD COLUMN IF NOT EXISTS visa_type TEXT,
    ADD COLUMN IF NOT EXISTS feedback TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
EXCEPTION WHEN others THEN NULL; END $$;

-- Trigger to maintain updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cancellations_updated_at ON public.cancellations;
CREATE TRIGGER trg_cancellations_updated_at
BEFORE UPDATE ON public.cancellations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


