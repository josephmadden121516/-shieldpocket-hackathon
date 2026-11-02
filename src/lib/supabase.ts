import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const publishableKey = (
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)
)?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && publishableKey)

export const supabase: SupabaseClient | null =
  supabaseUrl && publishableKey ? createClient(supabaseUrl, publishableKey) : null
