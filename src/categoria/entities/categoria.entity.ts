import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";

@Entity({ name: "tb_categoria" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    departamento!: string;

    @OneToMany(() => Funcionario, (funcionario) => funcionario.categoria)
    funcionarios!: Funcionario[];
}