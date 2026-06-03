import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from '../entities/certificado.entity';
import { Inscricao } from '../entities/inscricao.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado)
    private readonly repo: Repository<Certificado>,
    @InjectRepository(Inscricao)
    private readonly inscricaoRepo: Repository<Inscricao>,
  ) {}

  private gerarCodigo(): string {
    const ano   = new Date().getFullYear();
    const rand  = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${ano}-${rand}`;
  }

  async emitir(inscricaoId: number): Promise<Certificado> {
    const inscricao = await this.inscricaoRepo.findOne({
      where: { id: inscricaoId }, relations: ['treinamento'],
    });
    if (!inscricao) throw new HttpException('Inscrição não encontrada', HttpStatus.NOT_FOUND);

    const jaEmitido = await this.repo.findOne({ where: { inscricao: { id: inscricaoId } } });
    if (jaEmitido) throw new HttpException('Certificado já emitido para esta inscrição', HttpStatus.CONFLICT);

    const hoje          = new Date();
    const validadeMeses = inscricao.treinamento?.validadeMeses;
    let   dataVencimento: Date | null = null;

    if (validadeMeses) {
      dataVencimento = new Date(hoje);
      dataVencimento.setMonth(dataVencimento.getMonth() + validadeMeses);
    }

    const cert = this.repo.create({
      codigo:         this.gerarCodigo(),
      dataEmissao:    hoje,
      dataVencimento: dataVencimento ?? undefined,
      inscricao:      { id: inscricaoId } as any,
    });
    return this.repo.save(cert);
  }

  async findByFuncionario(funcionarioId: number): Promise<Certificado[]> {
    return this.repo
      .createQueryBuilder('cert')
      .leftJoinAndSelect('cert.inscricao', 'inscricao')
      .leftJoinAndSelect('inscricao.treinamento', 'treinamento')
      .leftJoinAndSelect('inscricao.funcionario', 'funcionario')
      .where('funcionario.id = :id', { id: funcionarioId })
      .orderBy('cert.dataEmissao', 'DESC')
      .getMany();
  }

  async findVencendo(dias = 30): Promise<Certificado[]> {
    const hoje  = new Date();
    const limit = new Date();
    limit.setDate(limit.getDate() + dias);
    return this.repo
      .createQueryBuilder('cert')
      .leftJoinAndSelect('cert.inscricao', 'inscricao')
      .leftJoinAndSelect('inscricao.funcionario', 'funcionario')
      .leftJoinAndSelect('inscricao.treinamento', 'treinamento')
      .where('cert.dataVencimento BETWEEN :hoje AND :limit', { hoje, limit })
      .getMany();
  }
}