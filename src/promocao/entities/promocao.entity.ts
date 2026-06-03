import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoMovimentacao {
  PROMOCAO      = 'PROMOCAO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  REBAIXAMENTO  = 'REBAIXAMENTO',
  MUDANCA_CARGO = 'MUDANCA_CARGO',
}

@Entity({ name: 'tb_promocao' })
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoMovimentacao })
  tipo: TipoMovimentacao;

  @Column({ length: 255 })
  cargoAnterior: string;

  @Column({ length: 255 })
  cargoNovo: string;

  @Column('float')
  salarioAnterior: number;

  @Column('float')
  salarioNovo: number;

  @Column({ length: 500, nullable: true })
  motivo: string;

  @CreateDateColumn()
  dataMovimentacao: Date;

  @ManyToOne(() => Funcionario, { eager: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}