export interface FaixaINSS {
  ate: number;
  aliquota: number;
}

// Tabela INSS 2025 — progressiva
export const TABELA_INSS_2025: FaixaINSS[] = [
  { ate: 1518.00,  aliquota: 0.075 },
  { ate: 2793.88,  aliquota: 0.09  },
  { ate: 4190.83,  aliquota: 0.12  },
  { ate: 8157.41,  aliquota: 0.14  },
];

export const TETO_INSS = 8157.41;