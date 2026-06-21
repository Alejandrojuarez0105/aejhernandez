import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase. La anon key es pública por diseño: la seguridad real
// la dan las políticas RLS de la base de datos (insertar = sí, leer = solo
// aprobados, aprobar = solo desde el panel de Supabase).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Si faltan las variables de entorno, queda en null y la UI lo maneja con
// elegancia (no rompe el build ni el dev).
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type Testimonial = {
  name: string;
  message: string;
  linkedin: string | null;
  github: string | null;
  created_at: string;
};
