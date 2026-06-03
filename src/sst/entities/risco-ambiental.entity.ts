import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoRisco {
  FISICO   = 'FISICO',
  QUIMICO  = 'QUIMICO',
  BIOLOGICO = 'BIOLOGICO',
  ERGONOMICO = 'ERGONOMICO',
  ACIDENTE = 'ACIDENTE',
  PSICOSSOCIAL = 'PSICOSSOCIAL',
}

export enum NivelRisco {
  BAIXO  = 'BAIXO',
  MEDIO  = 'MEDIO',
  ALTO   = 'ALTO',
  CRITICO = 'CRITICO',
}

@Entity({ name: 'tb_risco_ambiental' })
export class RiscoAmbiental {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  descricao!: string;

  @Column({ type: 'enum', enum: TipoRisco })
  tipo!: TipoRisco;

  @Column({ type: 'enum', enum: NivelRisco })
  nivel!: NivelRisco;

  @Column({ length: 255 })
  setor!: string;

  @Column({ length: 255, nullable: true })
  fonteGeradora!: string;

  @Column({ length: 500, nullable: true })
  medidasControle!: string;

  @Column({ length: 255, nullable: true })
  epiNecessario!: string;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;
}