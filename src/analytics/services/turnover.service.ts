import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Contrato, StatusContrato } from '../../contrato/entities/contrato.entity';

export interface DadosTurnover {
  admissoes:     number;
  desligamentos: number;
  taxaTurnover:  number;
  totalAtivos:   number;
}

export interface DadosTurnoverMes extends DadosTurnover {
  mes: number;
}

@Injectable()
export class TurnoverService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async calcularTaxaTurnover(ano: number, mes: number): Promise<DadosTurnover> {
    const inicio = new Date(ano, mes - 1, 1);
    const fim    = new Date(ano, mes, 0, 23, 59, 59);

    const admissoes = await this.contratoRepo.count({
      where: { dataAdmissao: Between(inicio, fim) as any },
    });

    const desligamentos = await this.contratoRepo.count({
      where: { dataRescisao: Between(inicio, fim) as any, status: StatusContrato.ENCERRADO },
    });

    const totalAtivos = await this.contratoRepo.count({
      where: { status: StatusContrato.ATIVO },
    });

    const taxaTurnover = totalAtivos > 0
      ? parseFloat((((admissoes + desligamentos) / 2 / totalAtivos) * 100).toFixed(2))
      : 0;

    return { admissoes, desligamentos, taxaTurnover, totalAtivos };
  }

  // ✅ array tipado explicitamente — evita inferência como never[]
  async historicoPorAno(ano: number): Promise<DadosTurnoverMes[]> {
    const meses: DadosTurnoverMes[] = [];
    for (let mes = 1; mes <= 12; mes++) {
      const dados = await this.calcularTaxaTurnover(ano, mes);
      meses.push({ mes, ...dados });           // ✅ sem erro de tipo
    }
    return meses;
  }
}