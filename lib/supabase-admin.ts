import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase con la SERVICE ROLE KEY. Salta las políticas RLS, así que
// SOLO debe usarse en el servidor (route handlers); NUNCA se importa desde un
// componente de cliente. Sirve para verificar testimonios, leer el email
// privado y, más adelante, agradecer al aprobar.
//
// Si falta la variable de entorno queda en null y los endpoints lo manejan con
// elegancia (devuelven un error controlado en vez de romper).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;
