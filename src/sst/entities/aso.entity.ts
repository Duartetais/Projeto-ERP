import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoASO {
  ADMISSIONAL       = 'ADMISSIONAL',
  PERIODICO         = 'PERIODICO',
  DEMISSIONAL       = 'DEMISSIONAL',
  RETORNO           = 'RETORNO',
  MUDANCA_FUNCAO    = 'MUDANCA_FUNCAO',
}

export enum ResultadoASO {
  APTO              = 'APTO',
  APTO_RESTRICOES   = 'APTO_RESTRICOES',
  INAPTO            = 'INAPTO',
}

@Entity({ name: 'tb_aso' })
export class Aso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoASO })
  tipo!: TipoASO;

  @Column({ type: 'enum', enum: ResultadoASO })
  resultado!: ResultadoASO;

  @Column({ type: 'date' })
  dataExame!: Date;

  @Column({ type: 'date', nullable: true })
  dataProximoExame!: Date;

  @Column({ length: 255 })
  medicoResponsavel!: string;

  @Column({ length: 20, nullable: true })
  crm!: string;

  @Column({ length: 500, nullable: true })
  observacao!: string;

  @Column({ length: 500, nullable: true })
  restricoes!: string;

  @Column({ length: 500, nullable: true })
  urlDocumento!: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;
}