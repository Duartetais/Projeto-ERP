-- ============================================================
-- PeopleCore DEV — dados iniciais para testes no Insomnia
-- O TypeORM (DB_SYNCHRONIZE=true) cria as tabelas automaticamente.
-- Este seed insere os dados DEPOIS que as tabelas existem.
-- ============================================================

USE peoplecore_dev;

-- ── Aguarda as tabelas existirem (criadas pelo TypeORM no start) ─────
-- Não criamos as tabelas aqui — o NestJS faz isso com synchronize:true
-- Este arquivo só popula dados de teste.

-- ── 1. Categorias (Departamentos) ────────────────────────────────────
INSERT IGNORE INTO tb_categoria (id, departamento) VALUES
  (1, 'Tecnologia da Informação'),
  (2, 'Recursos Humanos'),
  (3, 'Financeiro'),
  (4, 'Operações'),
  (5, 'Comercial');

-- ── 2. Usuários (senhas já com bcrypt — todas são "senha123") ─────────
-- Hash bcrypt de "senha123" (cost 10)
INSERT IGNORE INTO tb_usuario (id, nome, usuario, senha, foto) VALUES
  (1, 'Admin PeopleCore', 'admin@peoplecore.com',
   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL),
  (2, 'Ana RH', 'ana.rh@peoplecore.com',
   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL),
  (3, 'Carlos Gestor', 'carlos.gestor@peoplecore.com',
   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL);

-- ── 3. Funcionários ───────────────────────────────────────────────────
INSERT IGNORE INTO tb_funcionario (id, nome, cargo, horasTrabalhadas, salarioBase, usuario_id, categoria_id) VALUES
  (1, 'Maria Souza',    'Desenvolvedora Backend',  160, 8500.00,  1, 1),
  (2, 'João Pereira',   'Analista de RH',           160, 5200.00,  2, 2),
  (3, 'Fernanda Lima',  'Gerente Financeiro',       160, 12000.00, 3, 3),
  (4, 'Ricardo Alves',  'Analista de Operações',    160, 4800.00,  1, 4),
  (5, 'Beatriz Costa',  'Desenvolvedora Frontend',  160, 7500.00,  2, 1);

-- ── 4. Contratos ──────────────────────────────────────────────────────
INSERT IGNORE INTO tb_contrato (id, tipo, status, dataAdmissao, funcionario_id) VALUES
  (1, 'CLT', 'ATIVO', '2023-01-10', 1),
  (2, 'CLT', 'ATIVO', '2022-06-15', 2),
  (3, 'CLT', 'ATIVO', '2021-03-01', 3),
  (4, 'PJ',  'ATIVO', '2024-01-05', 4),
  (5, 'CLT', 'ATIVO', '2023-08-20', 5);

-- ── 5. EPIs básicos ───────────────────────────────────────────────────
INSERT IGNORE INTO tb_epi (id, nome, categoria, numeroCa, validadeCa, fabricante, estoqueAtual, estoqueMinimo) VALUES
  (1, 'Capacete de Segurança',  'PROTECAO_CABECA',    '12345', '2027-12-31', '3M',      50, 10),
  (2, 'Óculos de Proteção',     'PROTECAO_OCULAR',    '23456', '2026-06-30', 'Uvex',    30,  5),
  (3, 'Protetor Auricular',     'PROTECAO_AUDITIVA',  '34567', '2026-12-31', 'Moldex', 100, 20),
  (4, 'Luvas de Segurança',     'PROTECAO_MAOS',      '45678', '2027-03-31', 'Steelco', 80, 15),
  (5, 'Bota de Segurança',      'PROTECAO_PES',       '56789', '2028-01-31', 'Bracol',  20,  5);

-- ── 6. Treinamentos obrigatórios ──────────────────────────────────────
INSERT IGNORE INTO tb_treinamento (id, nome, tipo, modalidade, cargaHoraria, nrRelacionada, validadeMeses, ativo) VALUES
  (1, 'NR-1 Gestão de Riscos Ocupacionais', 'OBRIGATORIO_NR', 'PRESENCIAL',  8, 'NR-1',  12, true),
  (2, 'NR-6 Uso e Conservação de EPIs',     'OBRIGATORIO_NR', 'PRESENCIAL',  4, 'NR-6',  12, true),
  (3, 'NR-17 Ergonomia',                    'OBRIGATORIO_NR', 'EAD',         8, 'NR-17', 24, true),
  (4, 'Integração e Onboarding',            'ONBOARDING',     'PRESENCIAL', 16, NULL,     NULL, true),
  (5, 'Comunicação e Liderança',            'COMPORTAMENTAL', 'HIBRIDO',    24, NULL,     NULL, true);

-- ── 7. NRs de controle ────────────────────────────────────────────────
INSERT IGNORE INTO tb_nr_controle (id, numero, nome, status, aplicavelEmpresa, responsavel) VALUES
  (1, 'NR-1',  'Disposições Gerais e Gerenciamento de Riscos', 'CONFORME',     true, 'Ana RH'),
  (2, 'NR-5',  'CIPA',                                         'EM_ADEQUACAO', true, 'Ana RH'),
  (3, 'NR-6',  'Equipamentos de Proteção Individual',          'CONFORME',     true, 'Ana RH'),
  (4, 'NR-17', 'Ergonomia',                                    'CONFORME',     true, 'Ana RH'),
  (5, 'NR-7',  'PCMSO',                                        'CONFORME',     true, 'Ana RH');

SELECT 'Seed concluído com sucesso!' AS status;