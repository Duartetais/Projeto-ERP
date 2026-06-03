import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

export enum TipoRegistro {
  ENTRADA        = 'ENTRADA',
  SAIDA          = 'SAIDA',
  INTERVALO_INI  = 'INTERVALO_INI',
  INTERVALO_FIM  = 'INTERVALO_FIM',
}

export enum StatusPonto {
  NORMAL     = 'NORMAL',
  ATRASO     = 'ATRASO',
  HORA_EXTRA = 'HORA_EXTRA',
  FALTA      = 'FALTA',
  ABONADO    = 'ABONADO',
}

@Entity({ name: 'tb_registro_ponto' })
export class RegistroPonto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoRegistro })
  tipo: TipoRegistro;

  @Column({ type: 'enum', enum: StatusPonto, default: StatusPonto.NORMAL })
  status: StatusPonto;

  @Column({ type: 'datetime' })
  dataHora: Date;

  @Column({ length: 500, nullable: true })
  observacao: string;

  @Column({ nullable: true })
  horasExtras: number;

  @Column({ length: 100, nullable: true })
  localizacao: string;

  @CreateDateColumn()
  criadoEm: Date;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}