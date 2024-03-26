import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sjuczoznytcgoryuetkz.supabase.co/";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

export default supabase;
