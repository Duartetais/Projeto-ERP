import { Injectable } from '@nestjs/common';
import { TABELA_INSS_2025, TETO_INSS } from '../utils/tabela-inss';

@Injectable()
export class CalculoInssService {
  calcular(salarioBruto: number): number {
    const base = Math.min(salarioBruto, TETO_INSS);
    let desconto = 0;
    let faixaAnterior = 0;

    for (const faixa of TABELA_INSS_2025) {
      if (base <= faixa.ate) {
        desconto += (base - faixaAnterior) * faixa.aliquota;
        break;
      }
      desconto += (faixa.ate - faixaAnterior) * faixa.aliquota;
      faixaAnterior = faixa.ate;
    }

    return parseFloat(desconto.toFixed(2));
  }
}