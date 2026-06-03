import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculoFeriasService {
  calcularValor(salarioBruto: number, diasFruidos: number, venderTerco: boolean): number {
    const valorDiario    = salarioBruto / 30;
    const valorFerias    = valorDiario * diasFruidos;
    const terco          = valorFerias / 3;
    const abono          = venderTerco ? valorDiario * 10 : 0; // abono de 10 dias
    const total          = valorFerias + terco + abono;
    return parseFloat(total.toFixed(2));
  }

  calcularDiasRestantes(dataAdmissao: Date, diasJaUsados: number): number {
    const hoje        = new Date();
    const mesesTrab   = Math.floor((hoje.getTime() - dataAdmissao.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const diasDireito = Math.floor((mesesTrab / 12) * 30);
    return Math.max(0, diasDireito - diasJaUsados);
  }

  verificarFeriasVencidas(dataAdmissao: Date, ultimasFerias: Date | null): boolean {
    const hoje          = new Date();
    const referencia    = ultimasFerias ?? dataAdmissao;
    const mesesDesdeUlt = (hoje.getTime() - referencia.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return mesesDesdeUlt >= 24; // vence após 24 meses sem gozar
  }
}