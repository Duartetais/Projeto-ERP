export interface FaixaIRRF {
  ate: number | null;
  aliquota: number;
  deducao: number;
}

// Tabela IRRF 2025
export const TABELA_IRRF_2025: FaixaIRRF[] = [
  { ate: 2259.20,  aliquota: 0,    deducao: 0       },
  { ate: 2826.65,  aliquota: 0.075, deducao: 169.44  },
  { ate: 3751.05,  aliquota: 0.15,  deducao: 381.44  },
  { ate: 4664.68,  aliquota: 0.225, deducao: 662.77  },
  { ate: null,     aliquota: 0.275, deducao: 896.00  },
];

export const DEDUCAO_DEPENDENTE = 189.59;