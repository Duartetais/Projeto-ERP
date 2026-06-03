import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RegistroPonto, StatusPonto } from '../entities/registro-ponto.entity';
import { CreatePontoDto } from '../dto/create-ponto.dto';
import { UpdatePontoDto } from '../dto/update-ponto.dto';

@Injectable()
export class PontoService {
  constructor(
    @InjectRepository(RegistroPonto)
    private readonly repo: Repository<RegistroPonto>,
  ) {}

  async findAll(): Promise<RegistroPonto[]> {
    return this.repo.find({ relations: ['funcionario'], order: { dataHora: 'DESC' } });
  }

  async findById(id: number): Promise<RegistroPonto> {
    const registro = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!registro) throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
    return registro;
  }

  async findByFuncionario(funcionarioId: number): Promise<RegistroPonto[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      order: { dataHora: 'DESC' },
    });
  }

  async findByPeriodo(funcionarioId: number, inicio: string, fim: string): Promise<RegistroPonto[]> {
    return this.repo.find({
      where: {
        funcionario: { id: funcionarioId },
        dataHora: Between(new Date(inicio), new Date(fim)),
      },
      order: { dataHora: 'ASC' },
    });
  }

  async create(dto: CreatePontoDto): Promise<RegistroPonto> {
    const registro = this.repo.create({
      ...dto,
      dataHora: new Date(dto.dataHora),
      funcionario: { id: dto.funcionarioId },
    });
    return this.repo.save(registro);
  }

  async update(id: number, dto: UpdatePontoDto): Promise<RegistroPonto> {
    const registro = await this.findById(id);
    Object.assign(registro, dto);
    return this.repo.save(registro);
  }

  async abonar(id: number, observacao: string): Promise<RegistroPonto> {
    const registro = await this.findById(id);
    registro.status = StatusPonto.ABONADO;
    registro.observacao = observacao;
    return this.repo.save(registro);
  }

  async calcularHorasMes(funcionarioId: number, mes: number, ano: number): Promise<{ horasNormais: number; horasExtras: number; faltas: number }> {
    const inicio = new Date(ano, mes - 1, 1);
    const fim    = new Date(ano, mes, 0, 23, 59, 59);

    const registros = await this.repo.find({
      where: {
        funcionario: { id: funcionarioId },
        dataHora: Between(inicio, fim),
      },
    });

    const horasExtras = registros.reduce((acc, r) => acc + (r.horasExtras ?? 0), 0);
    const faltas      = registros.filter(r => r.status === StatusPonto.FALTA).length;

    return { horasNormais: registros.length * 8, horasExtras, faltas };
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}