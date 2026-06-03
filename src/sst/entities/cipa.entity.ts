import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum CargosCIPA {
  PRESIDENTE       = 'PRESIDENTE',
  VICE_PRESIDENTE  = 'VICE_PRESIDENTE',
  SECRETARIO       = 'SECRETARIO',
  MEMBRO_TITULAR   = 'MEMBRO_TITULAR',
  MEMBRO_SUPLENTE  = 'MEMBRO_SUPLENTE',
}

export enum FormaEleicaoCIPA {
  ELEITO    = 'ELEITO',
  DESIGNADO = 'DESIGNADO',
}

@Entity({ name: 'tb_cipa' })
export class Cipa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CargosCIPA })
  cargo: CargosCIPA;

  @Column({ type: 'enum', enum: FormaEleicaoCIPA })
  formaEleicao: FormaEleicaoCIPA;

  @Column({ type: 'date' })
  dataPosse: Date;

  @Column({ type: 'date' })
  dataFimMandato: Date;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  criadoEm: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}