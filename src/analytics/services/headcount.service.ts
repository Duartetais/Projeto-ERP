import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Contrato, StatusContrato } from '../../contrato/entities/contrato.entity';

@Injectable()
export class HeadcountService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcRepo: Repository<Funcionario>,
    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async headcountTotal(): Promise<number> {
    return this.contratoRepo.count({ where: { status: StatusContrato.ATIVO } });
  }

  async headcountPorDepartamento(): Promise<any[]> {
    return this.funcRepo
      .createQueryBuilder('f')
      .leftJoin('f.categoria', 'cat')
      .select('cat.departamento', 'departamento')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('cat.departamento')
      .getRawMany();
  }

  async headcountPorCargo(): Promise<any[]> {
    return this.funcRepo
      .createQueryBuilder('f')
      .select('f.cargo', 'cargo')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('f.cargo')
      .orderBy('total', 'DESC')
      .getRawMany();
  }

  async custoFolhaPorDepartamento(): Promise<any[]> {
    return this.funcRepo
      .createQueryBuilder('f')
      .leftJoin('f.categoria', 'cat')
      .select('cat.departamento', 'departamento')
      .addSelect('SUM(f.salarioBase)', 'custoTotal')
      .addSelect('AVG(f.salarioBase)', 'mediaSalarial')
      .addSelect('COUNT(f.id)', 'total')
      .groupBy('cat.departamento')
      .getRawMany();
  }
}