import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum StatusFerias {
  SOLICITADA = 'SOLICITADA',
  APROVADA   = 'APROVADA',
  REJEITADA  = 'REJEITADA',
  CONCLUIDA  = 'CONCLUIDA',
}

@Entity({ name: 'tb_ferias' })
export class Ferias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  dataInicio!: Date;

  @Column({ type: 'date' })
  dataFim!: Date;

  @Column()
  diasFruidos!: number;

  @Column({ default: false })
  tercoVendido!: boolean;

  @Column('float', { nullable: true })
  valorPago!: number;

  @Column({ type: 'enum', enum: StatusFerias, default: StatusFerias.SOLICITADA })
  status!: StatusFerias;

  @Column({ nullable: true })
  observacao!: string;

  @Column({ type: 'int' })
  periodoAquisitivoAno!: number;

  @CreateDateColumn()
  criadoEm!: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}