import { Injectable } from '@nestjs/common';
import { TABELA_IRRF_2025, DEDUCAO_DEPENDENTE } from '../utils/tabela-irrf';

@Injectable()
export class CalculoIrrfService {
  calcular(baseCalculo: number, numeroDependentes = 0): number {
    const base = baseCalculo - numeroDependentes * DEDUCAO_DEPENDENTE;

    for (const faixa of TABELA_IRRF_2025) {
      if (faixa.ate === null || base <= faixa.ate) {
        const irrf = base * faixa.aliquota - faixa.deducao;
        return parseFloat(Math.max(0, irrf).toFixed(2));
      }
    }
    return 0;
  }
}