/*
  # Dados iniciais para PMCAP

  1. Initial Data
    - Usuários padrão do sistema
    - Dados de exemplo para demonstração
    - Configurações básicas

  2. Security
    - Senhas são hasheadas para segurança
*/

-- Insert initial users (passwords will need to be hashed in production)
INSERT INTO users (username, name, rank, permissions, password_hash) VALUES
('comandante.silva', 'Coronel Silva', 'Coronel', ARRAY['administrador', 'coronel', 'cursos', 'recrutamento', 'editais'], 'admin123'),
('cap.santos', 'Capitão Santos', 'Capitão', ARRAY['administrador', 'cursos', 'recrutamento'], 'cap123'),
('sgt.oliveira', 'Sargento Oliveira', 'Sargento', ARRAY['cursos'], 'sgt123'),
('cb.costa', 'Cabo Costa', 'Cabo', ARRAY['recrutamento'], 'cb123'),
('sd.ferreira', 'Soldado Ferreira', 'Soldado', ARRAY['policial'], 'sd123')
ON CONFLICT (username) DO NOTHING;

-- Insert initial courses
INSERT INTO courses (name, description, image, link, category) VALUES
('Curso de Abordagem', 'Técnicas e procedimentos para abordagem policial segura e eficaz', '/placeholder.svg?height=200&width=300', '#', 'Operacional'),
('Curso de Acompanhamento', 'Métodos de acompanhamento e vigilância em operações policiais', '/placeholder.svg?height=200&width=300', '#', 'Investigação'),
('Curso de Boosting', 'Técnicas avançadas de perseguição e interceptação veicular', '/placeholder.svg?height=200&width=300', '#', 'Trânsito'),
('Curso de Comunicação', 'Comunicação eficaz em situações de emergência e operações', '/placeholder.svg?height=200&width=300', '#', 'Comunicação'),
('Curso Aerotático', 'Operações aéreas e coordenação com unidades terrestres', '/placeholder.svg?height=200&width=300', '#', 'Especializado'),
('Curso de Progressão', 'Desenvolvimento de carreira e liderança na corporação', '/placeholder.svg?height=200&width=300', '#', 'Carreira')
ON CONFLICT DO NOTHING;

-- Insert initial editais
INSERT INTO editais (title, description, unit, opening_date, closing_date, vacancies, image, link, status) VALUES
('Recrutamento GTM - Grupo Tático Militar', 'Processo seletivo para ingresso no Grupo Tático Militar. Vagas para soldados com experiência operacional.', 'GTM', '2024-02-01', '2024-02-28', 10, '/placeholder.svg?height=200&width=300', '#', 'Aberto'),
('Seleção GRA - Radiopatrulhamento Aéreo', 'Edital para formação de cadastro reserva do Grupo de Radiopatrulhamento Aéreo.', 'GRA', '2024-02-15', '2024-03-15', 5, '/placeholder.svg?height=200&width=300', '#', 'Aberto'),
('Processo Seletivo SPEED - Trânsito', 'Recrutamento para a unidade de policiamento de trânsito. Requisitos específicos de habilitação.', 'SPEED', '2024-01-15', '2024-01-31', 15, '/placeholder.svg?height=200&width=300', '#', 'Fechado')
ON CONFLICT DO NOTHING;

-- Insert initial news
INSERT INTO news (title, summary, content, author, date, category, image, featured) VALUES
('PMCAP Inaugura Nova Base Operacional no Distrito Sul', 'Nova instalação amplia cobertura de segurança e reduz tempo de resposta na região', 'A Polícia Militar de Cidade Alta Paradise inaugurou oficialmente sua nova base operacional...', 'Assessoria de Imprensa', '2024-01-28', 'Institucional', '/placeholder.svg?height=300&width=500', true),
('Operação Carnaval 2024 Registra Zero Ocorrências Graves', 'Planejamento estratégico e efetivo policial garantiram segurança durante os festejos', 'Durante os quatro dias de Carnaval, a PMCAP mobilizou mais de 100 policiais...', 'Coronel Silva', '2024-01-25', 'Operações', '/placeholder.svg?height=300&width=500', true)
ON CONFLICT DO NOTHING;

-- Insert initial events
INSERT INTO events (title, description, date, time, location, image, category, participants) VALUES
('Operação Cidade Segura', 'Grande operação de segurança com foco na prevenção de crimes e aproximação com a comunidade', '2024-02-15', '08:00', 'Centro de Cidade Alta Paradise', '/placeholder.svg?height=300&width=400', 'Operação', 45),
('Treinamento Tático Conjunto', 'Exercício de treinamento envolvendo todas as unidades especializadas da PMCAP', '2024-02-20', '14:00', 'Centro de Treinamento PMCAP', '/placeholder.svg?height=300&width=400', 'Treinamento', 80)
ON CONFLICT DO NOTHING;

-- Insert initial blitz types
INSERT INTO blitz_types (name, description, frequency, locations, objectives, image) VALUES
('Blitz de Trânsito', 'Fiscalização de infrações de trânsito, documentação veicular e condutores', 'Diária', ARRAY['Avenida Principal', 'Centro da Cidade', 'Saídas da Cidade'], ARRAY['Reduzir acidentes', 'Fiscalizar documentação', 'Educação no trânsito'], '/placeholder.svg?height=300&width=400'),
('Blitz Anti-Drogas', 'Operação de combate ao tráfico e uso de entorpecentes', 'Semanal', ARRAY['Pontos estratégicos', 'Áreas de risco', 'Eventos públicos'], ARRAY['Combater tráfico', 'Apreender drogas', 'Prisão de traficantes'], '/placeholder.svg?height=300&width=400'),
('Blitz de Armas', 'Fiscalização de porte ilegal de armas e munições', 'Quinzenal', ARRAY['Barreiras móveis', 'Pontos de controle', 'Eventos especiais'], ARRAY['Apreender armas ilegais', 'Reduzir violência', 'Controle de munições'], '/placeholder.svg?height=300&width=400')
ON CONFLICT DO NOTHING;