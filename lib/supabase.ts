import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  username: string
  name: string
  rank: string
  permissions: string[]
  created_at: string
  updated_at: string
}

export interface Course {
  id: number
  name: string
  description: string
  image: string
  link: string
  category: string
  created_at: string
  updated_at: string
}

export interface Edital {
  id: number
  title: string
  description: string
  unit: string
  opening_date: string
  closing_date: string
  vacancies: number
  image: string
  link: string
  status: 'Aberto' | 'Fechado' | 'Em Breve'
  created_at: string
  updated_at: string
}

export interface News {
  id: number
  title: string
  summary: string
  content: string
  author: string
  date: string
  category: string
  image: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  participants?: number
  created_at: string
  updated_at: string
}