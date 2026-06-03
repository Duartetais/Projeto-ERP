import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NrControle, StatusNR } from '../entities/nr-controle.entity';
import { CreateNrControleDto } from '../dto/create-nr-controle.dto';

@Injectable()
export class NrControleService {
  constructor(
    @InjectRepository(NrControle)
    private readonly repo: Repository<NrControle>,
  ) {}

  async findAll(): Promise<NrControle[]> {
    return this.repo.find({ order: { numero: 'ASC' } });
  }

  async findById(id: number): Promise<NrControle> {
    const nr = await this.repo.findOne({ where: { id } });
    if (!nr) throw new HttpException('NR não encontrada', HttpStatus.NOT_FOUND);
    return nr;
  }

  async findNaoConformes(): Promise<NrControle[]> {
    return this.repo.find({
      where: { status: StatusNR.NAO_CONFORME, aplicavelEmpresa: true },
    });
  }

  async create(dto: CreateNrControleDto): Promise<NrControle> {
    // ✅ campos de data opcionais com undefined, nunca null
    const nr = this.repo.create({
      numero:                dto.numero,
      nome:                  dto.nome,
      status:                dto.status,
      descricaoNaoConformidade: dto.descricaoNaoConformidade,
      planoAcao:             dto.planoAcao,
      responsavel:           dto.responsavel,
      aplicavelEmpresa:      dto.aplicavelEmpresa,
      prazoAdequacao:        dto.prazoAdequacao
        ? new Date(dto.prazoAdequacao)
        : undefined,                           // ✅ undefined, nunca null
      dataProximaAuditoria:  dto.dataProximaAuditoria
        ? new Date(dto.dataProximaAuditoria)
        : undefined,                           // ✅ undefined, nunca null
    });
    return this.repo.save(nr);
  }

  async update(id: number, dto: Partial<CreateNrControleDto>): Promise<NrControle> {
    const nr = await this.findById(id);
    Object.assign(nr, dto);
    return this.repo.save(nr);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}