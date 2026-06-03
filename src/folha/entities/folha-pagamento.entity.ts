import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum StatusFolha {
  RASCUNHO   = 'RASCUNHO',
  PROCESSADA = 'PROCESSADA',
  PAGA       = 'PAGA',
}

@Entity({ name: 'tb_folha_pagamento' })
export class FolhaPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mes: number;

  @Column()
  ano: number;

  @Column('float')
  salarioBruto: number;

  @Column('float')
  descontoINSS: number;

  @Column('float')
  descontoIRRF: number;

  @Column('float', { default: 0 })
  descontoFaltas: number;

  @Column('float', { default: 0 })
  adicionalHorasExtras: number;

  @Column('float', { default: 0 })
  adicionalInsalubridade: number;

  @Column('float', { default: 0 })
  adicionalPericulosidade: number;

  @Column('float', { default: 0 })
  outrosDescontos: number;

  @Column('float', { default: 0 })
  outrosAcrescimos: number;

  @Column('float')
  salarioLiquido: number;

  @Column('float')
  fgts: number;

  @Column({ type: 'enum', enum: StatusFolha, default: StatusFolha.RASCUNHO })
  status: StatusFolha;

  @Column({ nullable: true })
  observacao: string;

  @CreateDateColumn()
  criadoEm: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}