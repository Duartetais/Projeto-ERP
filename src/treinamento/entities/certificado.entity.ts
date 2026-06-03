import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inscricao } from './inscricao.entity';

@Entity({ name: 'tb_certificado' })
export class Certificado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  codigo: string;

  @Column({ type: 'date' })
  dataEmissao: Date;

  @Column({ type: 'date', nullable: true })
  dataVencimento: Date;

  @Column({ length: 500, nullable: true })
  urlDocumento: string;

  @CreateDateColumn()
  criadoEm: Date;

  @OneToOne(() => Inscricao)
  @JoinColumn({ name: 'inscricao_id' })
  inscricao: Inscricao;
}