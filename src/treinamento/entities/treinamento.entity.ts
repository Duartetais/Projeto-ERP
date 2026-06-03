import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ModalidadeTreinamento {
  PRESENCIAL = 'PRESENCIAL',
  EAD        = 'EAD',
  HIBRIDO    = 'HIBRIDO',
}

export enum TipoTreinamento {
  OBRIGATORIO_NR = 'OBRIGATORIO_NR',
  TECNICO        = 'TECNICO',
  COMPORTAMENTAL = 'COMPORTAMENTAL',
  LIDERANCA      = 'LIDERANCA',
  ONBOARDING     = 'ONBOARDING',
  RECICLAGEM     = 'RECICLAGEM',
}

@Entity({ name: 'tb_treinamento' })
export class Treinamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 1000, nullable: true })
  descricao: string;

  @Column({ type: 'enum', enum: TipoTreinamento })
  tipo: TipoTreinamento;

  @Column({ type: 'enum', enum: ModalidadeTreinamento })
  modalidade: ModalidadeTreinamento;

  @Column()
  cargaHoraria: number;

  @Column({ length: 20, nullable: true })
  nrRelacionada: string;

  @Column({ nullable: true })
  validadeMeses: number;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}