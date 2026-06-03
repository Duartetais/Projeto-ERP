import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treinamento } from '../entities/treinamento.entity';
import { Inscricao, StatusInscricao } from '../entities/inscricao.entity';
import { CreateTreinamentoDto } from '../dto/create-treinamento.dto';
import { InscricaoDto } from '../dto/inscricao.dto';

@Injectable()
export class TreinamentoService {
  constructor(
    @InjectRepository(Treinamento)
    private readonly treinRepo: Repository<Treinamento>,
    @InjectRepository(Inscricao)
    private readonly inscricaoRepo: Repository<Inscricao>,
  ) {}

  async findAll(): Promise<Treinamento[]> {
    return this.treinRepo.find({ where: { ativo: true }, order: { nome: 'ASC' } });
  }

  async findById(id: number): Promise<Treinamento> {
    const t = await this.treinRepo.findOne({ where: { id } });
    if (!t) throw new HttpException('Treinamento não encontrado', HttpStatus.NOT_FOUND);
    return t;
  }

  async create(dto: CreateTreinamentoDto): Promise<Treinamento> {
    return this.treinRepo.save(this.treinRepo.create(dto));
  }

  async update(id: number, dto: Partial<CreateTreinamentoDto>): Promise<Treinamento> {
    const t = await this.findById(id);
    Object.assign(t, dto);
    return this.treinRepo.save(t);
  }

  async inscrever(dto: InscricaoDto): Promise<Inscricao> {
    const jaInscrito = await this.inscricaoRepo.findOne({
      where: {
        funcionario:  { id: dto.funcionarioId },
        treinamento:  { id: dto.treinamentoId },
        status:       StatusInscricao.INSCRITO,
      },
    });
    if (jaInscrito) throw new HttpException('Funcionário já inscrito neste treinamento', HttpStatus.CONFLICT);

    const inscricao = this.inscricaoRepo.create({
      ...dto,
      dataInicio:  new Date(dto.dataInicio),
      funcionario: { id: dto.funcionarioId } as any,
      treinamento: { id: dto.treinamentoId } as any,
    });
    return this.inscricaoRepo.save(inscricao);
  }

  async concluir(inscricaoId: number, nota?: number): Promise<Inscricao> {
    const inscricao = await this.inscricaoRepo.findOne({
      where: { id: inscricaoId }, relations: ['treinamento'],
    });
    if (!inscricao) throw new HttpException('Inscrição não encontrada', HttpStatus.NOT_FOUND);

    inscricao.status        = StatusInscricao.CONCLUIDO;
    inscricao.dataConclusao = new Date();
    if (nota !== undefined) inscricao.nota = nota;

    return this.inscricaoRepo.save(inscricao);
  }

  async findInscricoesByFuncionario(funcionarioId: number): Promise<Inscricao[]> {
    return this.inscricaoRepo.find({
      where: { funcionario: { id: funcionarioId } },
      relations: ['treinamento'],
      order: { criadoEm: 'DESC' },
    });
  }

  async delete(id: number): Promise<void> {
    const t = await this.findById(id);
    t.ativo = false;
    await this.treinRepo.save(t);
  }
}