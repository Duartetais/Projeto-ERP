import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoCAT {
  INICIAL    = 'INICIAL',
  REABERTURA = 'REABERTURA',
  COMUNICACAO_OBITO = 'COMUNICACAO_OBITO',
}

export enum GravidadeAcidente {
  LEVE   = 'LEVE',
  GRAVE  = 'GRAVE',
  FATAL  = 'FATAL',
}

@Entity({ name: 'tb_cat' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoCAT, default: TipoCAT.INICIAL })
  tipo: TipoCAT;

  @Column({ type: 'enum', enum: GravidadeAcidente })
  gravidade: GravidadeAcidente;

  @Column({ type: 'datetime' })
  dataAcidente: Date;

  @Column({ length: 500 })
  descricaoAcidente: string;

  @Column({ length: 255 })
  parteAtingida: string;

  @Column({ length: 255 })
  agenteCausador: string;

  @Column({ length: 255, nullable: true })
  localAcidente: string;

  @Column({ default: false })
  enviadoEsocial: boolean;

  @Column({ length: 100, nullable: true })
  protocoloEsocial: string;

  @Column({ length: 500, nullable: true })
  planoAcao: string;

  @Column({ type: 'date', nullable: true })
  dataAfastamento: Date;

  @Column({ type: 'date', nullable: true })
  dataRetorno: Date;

  @CreateDateColumn()
  criadoEm: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}