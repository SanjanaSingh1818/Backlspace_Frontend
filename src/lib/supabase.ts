import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Workspace = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  discount: number;
  category: string;
  cta_text: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_interest?: string;
  message: string;
  status?: string;
  created_at?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  avatar_url?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption?: string;
  category: string;
  sort_order: number;
  created_at: string;
};
