-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create lawyers table
CREATE TABLE IF NOT EXISTS public.lawyers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  firm TEXT,
  specialization TEXT,
  consult_date DATE,
  phone TEXT,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  file_name TEXT,
  description TEXT,
  key_section TEXT,
  question_to_ask TEXT,
  shared_with UUID[] DEFAULT '{}', -- Array of lawyer IDs
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create painpoints table
CREATE TABLE IF NOT EXISTS public.painpoints (
  id TEXT PRIMARY KEY, -- e.g. 'vesting'
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT,
  evidence TEXT,
  status TEXT DEFAULT 'unresolved',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(id, user_id)
);

-- Create questions table
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY, -- e.g. 'v1'
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  painpoint_id TEXT REFERENCES public.painpoints(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  evidence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(id, user_id)
);

-- Create answers table
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  lawyer_id UUID REFERENCES public.lawyers(id) ON DELETE SET NULL,
  text TEXT NOT NULL,
  recommendation TEXT,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.painpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Profiles: Users can only see/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Lawyers: Users can only see/manage their own lawyers
CREATE POLICY "Users can view own lawyers" ON public.lawyers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lawyers" ON public.lawyers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lawyers" ON public.lawyers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lawyers" ON public.lawyers FOR DELETE USING (auth.uid() = user_id);

-- Documents: Users can only see/manage their own documents
CREATE POLICY "Users can view own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- Painpoints: Users can only see/manage their own painpoints
CREATE POLICY "Users can view own painpoints" ON public.painpoints FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own painpoints" ON public.painpoints FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own painpoints" ON public.painpoints FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own painpoints" ON public.painpoints FOR DELETE USING (auth.uid() = user_id);

-- Questions: Users can only see/manage their own questions
CREATE POLICY "Users can view own questions" ON public.questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own questions" ON public.questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own questions" ON public.questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own questions" ON public.questions FOR DELETE USING (auth.uid() = user_id);

-- Answers: Users can only see/manage their own answers
CREATE POLICY "Users can view own answers" ON public.answers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own answers" ON public.answers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own answers" ON public.answers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own answers" ON public.answers FOR DELETE USING (auth.uid() = user_id);
