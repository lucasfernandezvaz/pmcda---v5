/*
  # Schema inicial para PMCAP

  1. New Tables
    - `users` - Usuários do sistema com permissões
    - `courses` - Cursos e treinamentos
    - `editais` - Editais de recrutamento
    - `news` - Notícias e comunicados
    - `events` - Eventos e atividades
    - `blitz_types` - Tipos de operações blitz
    - `vehicles` - Viaturas da corporação
    - `weapons` - Armamentos disponíveis
    - `uniforms` - Fardamentos e uniformes
    - `manuals` - Manuais operacionais
    - `ranks` - Hierarquia militar
    - `perimeters` - Perímetros de ação

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  rank text NOT NULL,
  permissions text[] DEFAULT '{}',
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image text DEFAULT '',
  link text DEFAULT '',
  category text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Editais table
CREATE TABLE IF NOT EXISTS editais (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  unit text DEFAULT '',
  opening_date date,
  closing_date date,
  vacancies integer DEFAULT 0,
  image text DEFAULT '',
  link text DEFAULT '',
  status text DEFAULT 'Aberto' CHECK (status IN ('Aberto', 'Fechado', 'Em Breve')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id serial PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  category text DEFAULT '',
  image text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  date date NOT NULL,
  time time NOT NULL,
  location text NOT NULL DEFAULT '',
  image text DEFAULT '',
  category text DEFAULT '',
  participants integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blitz types table
CREATE TABLE IF NOT EXISTS blitz_types (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  frequency text DEFAULT '',
  locations text[] DEFAULT '{}',
  objectives text[] DEFAULT '{}',
  image text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id serial PRIMARY KEY,
  name text NOT NULL,
  image text DEFAULT '',
  authorized_ranks text[] DEFAULT '{}',
  vehicle_class text DEFAULT '',
  description text NOT NULL DEFAULT '',
  required_courses text[] DEFAULT '{}',
  authorized_units text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Weapons table
CREATE TABLE IF NOT EXISTS weapons (
  id serial PRIMARY KEY,
  name text NOT NULL,
  image text DEFAULT '',
  authorized_ranks text[] DEFAULT '{}',
  weapon_class text DEFAULT '',
  description text NOT NULL DEFAULT '',
  required_courses text[] DEFAULT '{}',
  authorized_units text[] DEFAULT '{}',
  caliber text DEFAULT '',
  capacity text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Uniforms table
CREATE TABLE IF NOT EXISTS uniforms (
  id serial PRIMARY KEY,
  name text NOT NULL,
  type text DEFAULT 'Masculino' CHECK (type IN ('Masculino', 'Feminino', 'Aluno')),
  image text DEFAULT '',
  items jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Manuals table
CREATE TABLE IF NOT EXISTS manuals (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text DEFAULT '',
  image text DEFAULT '',
  link text DEFAULT '',
  file_type text DEFAULT 'PDF',
  last_updated date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ranks table
CREATE TABLE IF NOT EXISTS ranks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  level integer NOT NULL,
  description text NOT NULL DEFAULT '',
  image text DEFAULT '',
  responsibilities text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Perimeters table
CREATE TABLE IF NOT EXISTS perimeters (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  coordinates text DEFAULT '',
  risk_level text DEFAULT 'Baixo' CHECK (risk_level IN ('Baixo', 'Médio', 'Alto', 'Crítico')),
  responsible_unit text DEFAULT '',
  image text DEFAULT '',
  last_update date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Changelog table
CREATE TABLE IF NOT EXISTS changelog (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  time time DEFAULT CURRENT_TIME,
  type text DEFAULT 'Atualização' CHECK (type IN ('Atualização', 'Correção', 'Nova Funcionalidade', 'Aviso')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE editais ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blitz_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weapons ENABLE ROW LEVEL SECURITY;
ALTER TABLE uniforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE perimeters ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users
CREATE POLICY "Users can read all data" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can read courses" ON courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage courses" ON courses FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND ('administrador' = ANY(permissions) OR 'cursos' = ANY(permissions))
  )
);

CREATE POLICY "Anyone can read editais" ON editais FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage editais" ON editais FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND ('administrador' = ANY(permissions) OR 'editais' = ANY(permissions))
  )
);

CREATE POLICY "Anyone can read news" ON news FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage news" ON news FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND ('administrador' = ANY(permissions) OR 'noticias' = ANY(permissions))
  )
);

CREATE POLICY "Anyone can read events" ON events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage events" ON events FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND ('administrador' = ANY(permissions) OR 'eventos' = ANY(permissions))
  )
);

CREATE POLICY "Anyone can read blitz_types" ON blitz_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage blitz_types" ON blitz_types FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND ('administrador' = ANY(permissions) OR 'blitz' = ANY(permissions))
  )
);

CREATE POLICY "Anyone can read vehicles" ON vehicles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage vehicles" ON vehicles FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read weapons" ON weapons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage weapons" ON weapons FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read uniforms" ON uniforms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage uniforms" ON uniforms FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read manuals" ON manuals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage manuals" ON manuals FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read ranks" ON ranks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage ranks" ON ranks FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read perimeters" ON perimeters FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage perimeters" ON perimeters FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);

CREATE POLICY "Anyone can read changelog" ON changelog FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage changelog" ON changelog FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND 'administrador' = ANY(permissions)
  )
);