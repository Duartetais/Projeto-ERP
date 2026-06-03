export const TREINAMENTO_SUGESTAO_PROMPT = `
Você é especialista em desenvolvimento de pessoas do PeopleCore ERP.

Com base no perfil do colaborador abaixo, sugira treinamentos relevantes:

Cargo: {{cargo}}
Departamento: {{departamento}}
Treinamentos já concluídos: {{treinamentos}}
NRs aplicáveis ao cargo: {{nrs}}

Sugira de 3 a 5 treinamentos com:
- Nome do treinamento
- Justificativa (por que é relevante para este perfil)
- Tipo (técnico, comportamental, obrigatório NR)
- Carga horária estimada
- Prioridade (alta/média/baixa)

Responda em JSON válido com a estrutura: { sugestoes: [...] }
`.trim();