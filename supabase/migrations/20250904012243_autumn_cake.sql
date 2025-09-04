/*
  # Schema inicial do PMCAP

  1. Novas Tabelas
    - `usuarios` - Dados dos usuários do sistema
    - `cursos` - Cursos disponíveis
    - `editais` - Editais e processos seletivos
    - `noticias` - Notícias e comunicados
    - `eventos` - Eventos e atividades
    - `inscricoes` - Inscrições em cursos
    - `participacoes` - Participações em eventos

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso baseadas em autenticação
    - Usuários só podem ver dados públicos ou próprios
*/

-- Tabela de usuários (complementa auth.users)
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text NOT NULL,
  tipo text NOT NULL DEFAULT 'aluno' CHECK (tipo IN ('aluno', 'professor', 'admin')),
  telefone text,
  endereco text,
  data_nascimento date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de cursos
CREATE TABLE IF NOT EXISTS cursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text NOT NULL,
  duracao text NOT NULL,
  modalidade text NOT NULL DEFAULT 'presencial' CHECK (modalidade IN ('presencial', 'online', 'hibrido')),
  vagas integer DEFAULT 0,
  professor_id uuid REFERENCES usuarios(id),
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de editais
CREATE TABLE IF NOT EXISTS editais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text NOT NULL,
  data_abertura date NOT NULL,
  data_fechamento date NOT NULL,
  status text NOT NULL DEFAULT 'aberto' CHECK (status IN ('aberto', 'fechado', 'em_analise')),
  arquivo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS noticias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  conteudo text NOT NULL,
  autor text NOT NULL,
  data_publicacao date NOT NULL DEFAULT CURRENT_DATE,
  imagem_url text,
  publicada boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text NOT NULL,
  data_evento timestamptz NOT NULL,
  local text NOT NULL,
  vagas integer DEFAULT 0,
  organizador_id uuid REFERENCES usuarios(id),
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de inscrições em cursos
CREATE TABLE IF NOT EXISTS inscricoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  curso_id uuid NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  data_inscricao timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'ativa' CHECK (status IN ('ativa', 'cancelada', 'concluida')),
  UNIQUE(usuario_id, curso_id)
);

-- Tabela de participações em eventos
CREATE TABLE IF NOT EXISTS participacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  evento_id uuid NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  data_inscricao timestamptz DEFAULT now(),
  presente boolean DEFAULT false,
  UNIQUE(usuario_id, evento_id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE editais ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE participacoes ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança

-- Usuários podem ver e editar seus próprios dados
CREATE POLICY "Usuários podem ver próprios dados"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprios dados"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Todos podem ver cursos ativos
CREATE POLICY "Todos podem ver cursos ativos"
  ON cursos FOR SELECT
  TO authenticated
  USING (ativo = true);

-- Todos podem ver editais
CREATE POLICY "Todos podem ver editais"
  ON editais FOR SELECT
  TO authenticated
  USING (true);

-- Todos podem ver notícias publicadas
CREATE POLICY "Todos podem ver notícias publicadas"
  ON noticias FOR SELECT
  TO authenticated
  USING (publicada = true);

-- Todos podem ver eventos ativos
CREATE POLICY "Todos podem ver eventos ativos"
  ON eventos FOR SELECT
  TO authenticated
  USING (ativo = true);

-- Usuários podem ver suas próprias inscrições
CREATE POLICY "Usuários podem ver próprias inscrições"
  ON inscricoes FOR SELECT
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar inscrições"
  ON inscricoes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = usuario_id);

-- Usuários podem ver suas próprias participações
CREATE POLICY "Usuários podem ver próprias participações"
  ON participacoes FOR SELECT
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar participações"
  ON participacoes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = usuario_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cursos_updated_at BEFORE UPDATE ON cursos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_editais_updated_at BEFORE UPDATE ON editais
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_noticias_updated_at BEFORE UPDATE ON noticias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();