import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aso } from '../entities/aso.entity';
import { CreateAsoDto } from '../dto/create-aso.dto';

@Injectable()
export class AsoService {
  constructor(
    @InjectRepository(Aso)
    private readonly repo: Repository<Aso>,
  ) {}

  async findAll(): Promise<Aso[]> {
    return this.repo.find({ relations: ['funcionario'], order: { dataExame: 'DESC' } });
  }

  async findById(id: number): Promise<Aso> {
    const aso = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!aso) throw new HttpException('ASO não encontrado', HttpStatus.NOT_FOUND);
    return aso;
  }

  async findByFuncionario(funcionarioId: number): Promise<Aso[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      order: { dataExame: 'DESC' },
    });
  }

  async findProximosVencer(dias = 30): Promise<Aso[]> {
    const hoje  = new Date();
    const limit = new Date();
    limit.setDate(limit.getDate() + dias);
    return this.repo
      .createQueryBuilder('aso')
      .leftJoinAndSelect('aso.funcionario', 'funcionario')
      .where('aso.dataProximoExame BETWEEN :hoje AND :limit', { hoje, limit })
      .getMany();
  }

  async findVencidos(): Promise<Aso[]> {
    return this.repo
      .createQueryBuilder('aso')
      .leftJoinAndSelect('aso.funcionario', 'funcionario')
      .where('aso.dataProximoExame < :hoje', { hoje: new Date() })
      .getMany();
  }

  async create(dto: CreateAsoDto): Promise<Aso> {
    // ✅ undefined em vez de null — TypeORM não aceita null em DeepPartial<Date>
    const aso = this.repo.create({
      tipo:             dto.tipo,
      resultado:        dto.resultado,
      medicoResponsavel: dto.medicoResponsavel,
      crm:              dto.crm,
      observacao:       dto.observacao,
      restricoes:       dto.restricoes,
      urlDocumento:     dto.urlDocumento,
      dataExame:        new Date(dto.dataExame),
      dataProximoExame: dto.dataProximoExame
        ? new Date(dto.dataProximoExame)
        : undefined,                           // ✅ undefined, nunca null
      funcionario:      { id: dto.funcionarioId } as any,
    });
    return this.repo.save(aso);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}