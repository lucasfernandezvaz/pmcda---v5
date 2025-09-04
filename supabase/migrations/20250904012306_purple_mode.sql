/*
  # Dados de exemplo para o PMCAP

  1. Dados inseridos
    - Cursos de exemplo
    - Editais de exemplo
    - Notícias de exemplo
    - Eventos de exemplo

  2. Observações
    - Dados são inseridos apenas se não existirem
    - IDs específicos para facilitar referências
*/

-- Inserir cursos de exemplo
INSERT INTO cursos (id, nome, descricao, duracao, modalidade, vagas) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Desenvolvimento Web Completo', 'Aprenda HTML, CSS, JavaScript e frameworks modernos para criar aplicações web profissionais.', '6 meses', 'hibrido', 30),
  ('550e8400-e29b-41d4-a716-446655440002', 'Python para Iniciantes', 'Curso introdutório de programação em Python, ideal para quem está começando na área de tecnologia.', '3 meses', 'online', 50),
  ('550e8400-e29b-41d4-a716-446655440003', 'Design Gráfico Digital', 'Domine as ferramentas de design gráfico e crie materiais visuais impactantes.', '4 meses', 'presencial', 25),
  ('550e8400-e29b-41d4-a716-446655440004', 'Marketing Digital', 'Estratégias de marketing digital, redes sociais e análise de dados para impulsionar negócios.', '2 meses', 'online', 40),
  ('550e8400-e29b-41d4-a716-446655440005', 'Gestão de Projetos', 'Metodologias ágeis e ferramentas para gerenciar projetos de forma eficiente.', '3 meses', 'hibrido', 35)
ON CONFLICT (id) DO NOTHING;

-- Inserir editais de exemplo
INSERT INTO editais (id, titulo, descricao, data_abertura, data_fechamento, status) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Processo Seletivo - Cursos Técnicos 2025', 'Abertura de inscrições para cursos técnicos profissionalizantes. Vagas limitadas para diversos cursos.', '2025-01-15', '2025-02-15', 'aberto'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Bolsas de Estudo - Graduação', 'Programa de bolsas de estudo para cursos de graduação. Critérios socioeconômicos aplicáveis.', '2025-01-10', '2025-01-31', 'aberto'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Seleção de Monitores', 'Processo seletivo para monitores acadêmicos. Oportunidade de desenvolvimento profissional.', '2024-12-01', '2024-12-31', 'fechado'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Programa de Estágio', 'Vagas de estágio em diversas áreas. Oportunidade para estudantes aplicarem conhecimentos práticos.', '2025-01-20', '2025-02-20', 'em_analise')
ON CONFLICT (id) DO NOTHING;

-- Inserir notícias de exemplo
INSERT INTO noticias (id, titulo, conteudo, autor, data_publicacao) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Início das Aulas 2025', 'As aulas do primeiro semestre de 2025 começam no dia 10 de fevereiro. Todos os alunos devem comparecer para a aula inaugural e receber informações importantes sobre o cronograma acadêmico.', 'Coordenação Acadêmica', '2025-01-08'),
  ('770e8400-e29b-41d4-a716-446655440002', 'Nova Biblioteca Digital', 'Lançamento da nova plataforma de biblioteca digital com mais de 10.000 títulos disponíveis para consulta online. Acesso liberado para todos os estudantes matriculados.', 'Biblioteca Central', '2025-01-05'),
  ('770e8400-e29b-41d4-a716-446655440003', 'Semana de Tecnologia 2025', 'Entre os dias 15 e 19 de março acontecerá a Semana de Tecnologia com palestras, workshops e feira de projetos. Inscrições abertas para participantes e expositores.', 'Departamento de TI', '2025-01-03'),
  ('770e8400-e29b-41d4-a716-446655440004', 'Resultados do ENEM', 'Divulgação dos resultados do ENEM 2024 e orientações para uso da nota em processos seletivos. Atendimento personalizado disponível na secretaria.', 'Secretaria Acadêmica', '2025-01-02')
ON CONFLICT (id) DO NOTHING;

-- Inserir eventos de exemplo
INSERT INTO eventos (id, titulo, descricao, data_evento, local, vagas) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', 'Palestra: Inteligência Artificial no Mercado de Trabalho', 'Discussão sobre o impacto da IA nas profissões do futuro e como se preparar para as mudanças do mercado.', '2025-01-25 19:00:00', 'Auditório Principal', 100),
  ('880e8400-e29b-41d4-a716-446655440002', 'Workshop: Desenvolvimento Mobile', 'Hands-on de desenvolvimento de aplicativos móveis usando React Native. Traga seu notebook!', '2025-02-01 14:00:00', 'Laboratório de Informática', 30),
  ('880e8400-e29b-41d4-a716-446655440003', 'Feira de Profissões', 'Evento para apresentação de diferentes carreiras e oportunidades profissionais. Participação de empresas parceiras.', '2025-02-10 09:00:00', 'Pátio Central', 200),
  ('880e8400-e29b-41d4-a716-446655440004', 'Hackathon Estudantil', 'Competição de programação de 48 horas. Equipes de até 4 pessoas. Prêmios para os melhores projetos.', '2025-02-15 18:00:00', 'Centro de Inovação', 80),
  ('880e8400-e29b-41d4-a716-446655440005', 'Aula Magna: Sustentabilidade', 'Conferência sobre práticas sustentáveis e responsabilidade ambiental no século XXI.', '2025-02-20 10:00:00', 'Auditório Principal', 150)
ON CONFLICT (id) DO NOTHING;