import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlivjibbbncknzummiud.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saXZqaWJiYm5ja256dW1taXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTE3MjMsImV4cCI6MjA0MTQ2NzcyM30.unQfHrLiigJVd5FwaM-nVtvI2vuxCr5-N0RlRo6QGlQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
