import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocao } from '../entities/promocao.entity';
import { CreatePromocaoDto } from '../dto/create-promocao.dto';

@Injectable()
export class PromocaoService {
  constructor(
    @InjectRepository(Promocao)
    private readonly repo: Repository<Promocao>,
  ) {}

  async findAll(): Promise<Promocao[]> {
    return this.repo.find({ relations: ['funcionario'] });
  }

  async findByFuncionario(funcionarioId: number): Promise<Promocao[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      relations: ['funcionario'],
      order: { dataMovimentacao: 'DESC' },
    });
  }

  async findById(id: number): Promise<Promocao> {
    const promocao = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!promocao) throw new HttpException('Movimentação não encontrada', HttpStatus.NOT_FOUND);
    return promocao;
  }

  async create(dto: CreatePromocaoDto): Promise<Promocao> {
    const promocao = this.repo.create({
      ...dto,
      funcionario: { id: dto.funcionarioId },
    });
    return this.repo.save(promocao);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}