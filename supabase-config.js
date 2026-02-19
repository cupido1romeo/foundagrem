// Supabase Configuration
const SUPABASE_URL = 'https://flveuwhyiqekaxyjxggr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdmV1d2h5aXFla2F4eWp4Z2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODQ1MTUsImV4cCI6MjA4NzA2MDUxNX0.-kFS4H9IdHacvg1oIghCrZCZxWXKLcbZoaXQf17ptnY';

// Initialize the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabase = supabaseClient;
