import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  nome: string
  tipo: 'aluno' | 'professor' | 'admin'
  created_at: string
}

export interface Curso {
  id: string
  nome: string
  descricao: string
  duracao: string
  modalidade: 'presencial' | 'online' | 'hibrido'
  created_at: string
}

export interface Edital {
  id: string
  titulo: string
  descricao: string
  data_abertura: string
  data_fechamento: string
  status: 'aberto' | 'fechado' | 'em_analise'
  created_at: string
}

export interface Noticia {
  id: string
  titulo: string
  conteudo: string
  autor: string
  data_publicacao: string
  created_at: string
}

export interface Evento {
  id: string
  titulo: string
  descricao: string
  data_evento: string
  local: string
  created_at: string
}