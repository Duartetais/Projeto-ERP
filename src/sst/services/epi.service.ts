import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Epi } from '../entities/epi.entity';
import { EntregaEpi, StatusEntregaEPI } from '../entities/entrega-epi.entity';
import { CreateEpiDto } from '../dto/create-epi.dto';
import { EntregaEpiDto } from '../dto/entrega-epi.dto';

@Injectable()
export class EpiService {
  constructor(
    @InjectRepository(Epi)
    private readonly epiRepo: Repository<Epi>,
    @InjectRepository(EntregaEpi)
    private readonly entregaRepo: Repository<EntregaEpi>,
  ) {}

  async findAll(): Promise<Epi[]> {
    return this.epiRepo.find({ order: { nome: 'ASC' } });
  }

  async findById(id: number): Promise<Epi> {
    const epi = await this.epiRepo.findOne({ where: { id } });
    if (!epi) throw new HttpException('EPI não encontrado', HttpStatus.NOT_FOUND);
    return epi;
  }

  async findCasVencidos(): Promise<Epi[]> {
    return this.epiRepo.find({
      where: { validadeCa: LessThanOrEqual(new Date()) as any },
    });
  }

  async findEstoqueMinimo(): Promise<Epi[]> {
    return this.epiRepo
      .createQueryBuilder('epi')
      .where('epi.estoqueAtual <= epi.estoqueMinimo')
      .getMany();
  }

  async create(dto: CreateEpiDto): Promise<Epi> {
    const epi = this.epiRepo.create({
      ...dto,
      validadeCa: new Date(dto.validadeCa),
    });
    return this.epiRepo.save(epi);
  }

  async update(id: number, dto: Partial<CreateEpiDto>): Promise<Epi> {
    const epi = await this.findById(id);
    Object.assign(epi, dto);
    return this.epiRepo.save(epi);
  }

  async registrarEntrega(dto: EntregaEpiDto): Promise<EntregaEpi> {
    const epi = await this.findById(dto.epiId);

    if (epi.estoqueAtual < dto.quantidade)
      throw new HttpException('Estoque insuficiente', HttpStatus.BAD_REQUEST);

    epi.estoqueAtual -= dto.quantidade;
    await this.epiRepo.save(epi);

    // ✅ undefined em vez de null nos campos de data opcionais
    const entrega = this.entregaRepo.create({
      quantidade:       dto.quantidade,
      observacao:       dto.observacao,
      dataEntrega:      new Date(dto.dataEntrega),
      dataProximaTroca: dto.dataProximaTroca
        ? new Date(dto.dataProximaTroca)
        : undefined,                           // ✅ undefined, nunca null
      funcionario:      { id: dto.funcionarioId } as any,
      epi:              { id: dto.epiId } as any,
    });
    return this.entregaRepo.save(entrega);
  }

  async findEntregasByFuncionario(funcionarioId: number): Promise<EntregaEpi[]> {
    return this.entregaRepo.find({
      where: { funcionario: { id: funcionarioId }, status: StatusEntregaEPI.ATIVO },
      relations: ['epi', 'funcionario'],
    });
  }

  async registrarDevolucao(entregaId: number): Promise<EntregaEpi> {
    const entrega = await this.entregaRepo.findOne({
      where: { id: entregaId }, relations: ['epi'],
    });
    if (!entrega) throw new HttpException('Entrega não encontrada', HttpStatus.NOT_FOUND);

    entrega.status        = StatusEntregaEPI.DEVOLVIDO;
    entrega.dataDevolucao = new Date();
    entrega.epi.estoqueAtual += entrega.quantidade;

    await this.epiRepo.save(entrega.epi);
    return this.entregaRepo.save(entrega);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.epiRepo.delete(id);
  }
}