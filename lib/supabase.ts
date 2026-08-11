import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nukcnzgqqrrgauzzcjnp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51a2NuemdxcXJyZ2F1enpjam5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzcxNzEsImV4cCI6MjEwMjAxMzE3MX0.QE-DIJNUqI0xvRbj0IoKHMhST-zkcz1eJOmmMXokNJQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
