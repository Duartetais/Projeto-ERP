import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato, StatusContrato } from '../entities/contrato.entity';
import { CreateContratoDto } from '../dto/create-contrato.dto';
import { UpdateContratoDto } from '../dto/update-contrato.dto';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly repo: Repository<Contrato>,
  ) {}

  async findAll(): Promise<Contrato[]> {
    return this.repo.find({ relations: ['funcionario'] });
  }

  async findById(id: number): Promise<Contrato> {
    const contrato = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!contrato) throw new HttpException('Contrato não encontrado', HttpStatus.NOT_FOUND);
    return contrato;
  }

  async findByFuncionario(funcionarioId: number): Promise<Contrato> {
    const contrato = await this.repo.findOne({
      where: { funcionario: { id: funcionarioId }, status: StatusContrato.ATIVO },
      relations: ['funcionario'],
    });
    if (!contrato) throw new HttpException('Contrato ativo não encontrado', HttpStatus.NOT_FOUND);
    return contrato;
  }

  async create(dto: CreateContratoDto): Promise<Contrato> {
    const contrato = this.repo.create({
      ...dto,
      funcionario: { id: dto.funcionarioId },
    });
    return this.repo.save(contrato);
  }

  async update(id: number, dto: UpdateContratoDto): Promise<Contrato> {
    const contrato = await this.findById(id);
    Object.assign(contrato, dto);
    return this.repo.save(contrato);
  }

  async encerrar(id: number, motivo: string): Promise<Contrato> {
    const contrato = await this.findById(id);
    contrato.status = StatusContrato.ENCERRADO;
    contrato.dataRescisao = new Date();
    contrato.motivoRescisao = motivo;
    return this.repo.save(contrato);
  }
}