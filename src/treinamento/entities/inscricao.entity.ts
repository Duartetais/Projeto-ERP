import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Treinamento } from './treinamento.entity';

export enum StatusInscricao {
  INSCRITO   = 'INSCRITO',
  CONCLUIDO  = 'CONCLUIDO',
  REPROVADO  = 'REPROVADO',
  CANCELADO  = 'CANCELADO',
  PENDENTE   = 'PENDENTE',
}

@Entity({ name: 'tb_inscricao_treinamento' })
export class Inscricao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: StatusInscricao, default: StatusInscricao.INSCRITO })
  status: StatusInscricao;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date', nullable: true })
  dataConclusao: Date;

  @Column('float', { nullable: true })
  nota: number;

  @Column({ length: 500, nullable: true })
  observacao: string;

  @CreateDateColumn()
  criadoEm: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @ManyToOne(() => Treinamento)
  @JoinColumn({ name: 'treinamento_id' })
  treinamento: Treinamento;
}