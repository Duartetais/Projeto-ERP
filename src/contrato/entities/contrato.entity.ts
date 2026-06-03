import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoContrato {
  CLT        = 'CLT',
  PJ         = 'PJ',
  ESTAGIO    = 'ESTAGIO',
  TEMPORARIO = 'TEMPORARIO',
  APRENDIZ   = 'APRENDIZ',
}

export enum StatusContrato {
  ATIVO     = 'ATIVO',
  ENCERRADO = 'ENCERRADO',
  SUSPENSO  = 'SUSPENSO',
}

@Entity({ name: 'tb_contrato' })
export class Contrato {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoContrato })
  tipo!: TipoContrato;

  @Column({ type: 'enum', enum: StatusContrato, default: StatusContrato.ATIVO })
  status!: StatusContrato;

  @Column({ type: 'date' })
  dataAdmissao!: Date;

  @Column({ type: 'date', nullable: true })
  dataFimExperiencia!: Date;

  @Column({ type: 'date', nullable: true })
  dataRescisao!: Date;

  @Column({ length: 255, nullable: true })
  motivoRescisao!: string;

  @Column({ length: 20, nullable: true })
  ctps!: string;

  @Column({ length: 20, nullable: true })
  pis!: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;

  @OneToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}