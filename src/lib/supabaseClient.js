import { createClient } from '@supabase/supabase-js';

// Clean out /rest/v1, trailing slashes, and spaces automatically
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl
    .trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);