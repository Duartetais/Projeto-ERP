import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum CategoriaEPI {
  PROTECAO_CABECA      = 'PROTECAO_CABECA',
  PROTECAO_OCULAR      = 'PROTECAO_OCULAR',
  PROTECAO_AUDITIVA    = 'PROTECAO_AUDITIVA',
  PROTECAO_RESPIRATORIA = 'PROTECAO_RESPIRATORIA',
  PROTECAO_MAOS        = 'PROTECAO_MAOS',
  PROTECAO_PES         = 'PROTECAO_PES',
  PROTECAO_CORPO       = 'PROTECAO_CORPO',
  PROTECAO_QUEDAS      = 'PROTECAO_QUEDAS',
  OUTROS               = 'OUTROS',
}

@Entity({ name: 'tb_epi' })
export class Epi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'enum', enum: CategoriaEPI })
  categoria: CategoriaEPI;

  @Column({ length: 50 })
  numeroCa: string;

  @Column({ type: 'date' })
  validadeCa: Date;

  @Column({ length: 255 })
  fabricante: string;

  @Column({ length: 500, nullable: true })
  descricao: string;

  @Column({ default: 0 })
  estoqueAtual: number;

  @Column({ default: 5 })
  estoqueMinimo: number;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}