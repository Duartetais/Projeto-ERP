import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Laudo, StatusLaudo } from '../entities/laudo.entity';
import { CreateLaudoDto } from '../dto/create-laudo.dto';

@Injectable()
export class LaudoService {
  constructor(
    @InjectRepository(Laudo)
    private readonly repo: Repository<Laudo>,
  ) {}

  async findAll(): Promise<Laudo[]> {
    return this.repo.find({ relations: ['funcionario'], order: { dataVencimento: 'ASC' } });
  }

  async findById(id: number): Promise<Laudo> {
    const laudo = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!laudo) throw new HttpException('Laudo não encontrado', HttpStatus.NOT_FOUND);
    return laudo;
  }

  async findVencidos(): Promise<Laudo[]> {
    const hoje = new Date();
    return this.repo.find({
      where: { dataVencimento: LessThanOrEqual(hoje), status: StatusLaudo.VIGENTE },
    });
  }

  async findProximosVencer(dias = 30): Promise<Laudo[]> {
    const hoje  = new Date();
    const limit = new Date();
    limit.setDate(limit.getDate() + dias);
    return this.repo
      .createQueryBuilder('laudo')
      .where('laudo.dataVencimento BETWEEN :hoje AND :limit', { hoje, limit })
      .andWhere('laudo.status = :status', { status: StatusLaudo.VIGENTE })
      .getMany();
  }

  async create(dto: CreateLaudoDto): Promise<Laudo> {
    const laudo = this.repo.create({
      ...dto,
      dataEmissao:    new Date(dto.dataEmissao),
      dataVencimento: new Date(dto.dataVencimento),
      funcionario:    dto.funcionarioId ? { id: dto.funcionarioId } as any : null,
    });
    return this.repo.save(laudo);
  }

  async atualizarStatus(id: number, status: StatusLaudo): Promise<Laudo> {
    const laudo = await this.findById(id);
    laudo.status = status;
    return this.repo.save(laudo);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}