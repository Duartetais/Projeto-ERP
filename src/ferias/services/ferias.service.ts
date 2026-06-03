import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ferias, StatusFerias } from '../entities/ferias.entity';
import { SolicitarFeriasDto } from '../dto/solicitar-ferias.dto';
import { CalculoFeriasService } from './calculo-ferias.service';

@Injectable()
export class FeriasService {
  constructor(
    @InjectRepository(Ferias)
    private readonly repo: Repository<Ferias>,
    private readonly calculoService: CalculoFeriasService,
  ) {}

  async findAll(): Promise<Ferias[]> {
    return this.repo.find({ relations: ['funcionario'], order: { criadoEm: 'DESC' } });
  }

  async findById(id: number): Promise<Ferias> {
    const ferias = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!ferias) throw new HttpException('Férias não encontradas', HttpStatus.NOT_FOUND);
    return ferias;
  }

  async findByFuncionario(funcionarioId: number): Promise<Ferias[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      order: { criadoEm: 'DESC' },
    });
  }

  async solicitar(dto: SolicitarFeriasDto): Promise<Ferias> {
    const funcionario = await this.repo.manager.findOne('tb_funcionario' as any, {
      where: { id: dto.funcionarioId },
    }) as any;

    const valorPago = this.calculoService.calcularValor(
      funcionario?.salarioBase ?? 0,
      dto.diasFruidos,
      dto.tercoVendido ?? false,
    );

    const ferias = this.repo.create({
      ...dto,
      dataInicio:  new Date(dto.dataInicio),
      dataFim:     new Date(dto.dataFim),
      valorPago,
      funcionario: { id: dto.funcionarioId } as any,
    });

    return this.repo.save(ferias);
  }

  async aprovar(id: number): Promise<Ferias> {
    const ferias = await this.findById(id);
    if (ferias.status !== StatusFerias.SOLICITADA)
      throw new HttpException('Apenas férias solicitadas podem ser aprovadas', HttpStatus.BAD_REQUEST);
    ferias.status = StatusFerias.APROVADA;
    return this.repo.save(ferias);
  }

  async rejeitar(id: number, motivo: string): Promise<Ferias> {
    const ferias = await this.findById(id);
    ferias.status     = StatusFerias.REJEITADA;
    ferias.observacao = motivo;
    return this.repo.save(ferias);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}