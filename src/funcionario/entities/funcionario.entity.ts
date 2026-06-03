import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_funcionario' })
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  cargo!: string;

  @IsNotEmpty()
  @Column()
  horasTrabalhadas!: number;

  @IsNotEmpty()
  @Column('float')
  salarioBase!: number;

  salarioTotal?: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.funcionarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.funcionarios)
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;
}