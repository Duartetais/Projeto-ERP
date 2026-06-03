import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Epi } from './epi.entity';

export enum StatusEntregaEPI {
  ATIVO     = 'ATIVO',
  DEVOLVIDO = 'DEVOLVIDO',
  EXTRAVIADO = 'EXTRAVIADO',
}

@Entity({ name: 'tb_entrega_epi' })
export class EntregaEpi {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantidade!: number;

  @Column({ type: 'date' })
  dataEntrega!: Date;

  @Column({ type: 'date', nullable: true })
  dataDevolucao!: Date;

  @Column({ type: 'date', nullable: true })
  dataProximaTroca!: Date;

  @Column({ type: 'enum', enum: StatusEntregaEPI, default: StatusEntregaEPI.ATIVO })
  status!: StatusEntregaEPI;

  @Column({ length: 500, nullable: true })
  observacao!: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;

  @ManyToOne(() => Epi)
  @JoinColumn({ name: 'epi_id' })
  epi!: Epi;
}