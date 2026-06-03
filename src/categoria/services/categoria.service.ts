import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            }
        });

        if (!categoria)
            throw new HttpException('Departamento não encontrado!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findAllByDepartamento(departamento: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                departamento: ILike(`%${departamento}%`)
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        await this.findById(categoria.id);

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.categoriaRepository.delete(id);

    }

}