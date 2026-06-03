import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly repo: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return this.repo.find({ relations: ['funcionario'], order: { dataAcidente: 'DESC' } });
  }

  async findById(id: number): Promise<Cat> {
    const cat = await this.repo.findOne({ where: { id }, relations: ['funcionario'] });
    if (!cat) throw new HttpException('CAT não encontrada', HttpStatus.NOT_FOUND);
    return cat;
  }

  async findByFuncionario(funcionarioId: number): Promise<Cat[]> {
    return this.repo.find({
      where: { funcionario: { id: funcionarioId } },
      order: { dataAcidente: 'DESC' },
    });
  }

  async create(dto: CreateCatDto): Promise<Cat> {
    // ✅ Correção: undefined em vez de null — TypeORM não aceita null em DeepPartial<Date>
    const cat = this.repo.create({
      tipo:            dto.tipo,
      gravidade:       dto.gravidade,
      descricaoAcidente: dto.descricaoAcidente,
      parteAtingida:   dto.parteAtingida,
      agenteCausador:  dto.agenteCausador,
      localAcidente:   dto.localAcidente,
      planoAcao:       dto.planoAcao,
      dataAcidente:    new Date(dto.dataAcidente),
      dataAfastamento: dto.dataAfastamento          // ✅ undefined quando não enviado (sem conversão forçada)
        ? new Date(dto.dataAfastamento)
        : undefined,
      funcionario:     { id: dto.funcionarioId } as any,
    });
    return this.repo.save(cat);
  }

  async marcarEnviadoEsocial(id: number, protocolo: string): Promise<Cat> {
    const cat = await this.findById(id);
    cat.enviadoEsocial   = true;
    cat.protocoloEsocial = protocolo;
    return this.repo.save(cat);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}