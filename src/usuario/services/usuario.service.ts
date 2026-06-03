import * as bcrypt from 'bcryptjs';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Usuario } from "../entities/usuario.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
    ) { }

    async findAll(): Promise<Usuario[]> {
        const localiza = await this.usuarioRepository.find()
        if (localiza.length === 0) {
            throw new HttpException("Nenhum Usuário Cadastrado", HttpStatus.NOT_FOUND)
        }
        return localiza
    }


    async findById(id: number): Promise<Usuario> {
        const localiza = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if(!localiza) {
            throw new HttpException("Nenhum usuário localizado com o id " + id, HttpStatus.NOT_FOUND)
        }
        return localiza
    }

    async findByNome(nome: string): Promise<Usuario[]> {
        const localiza = await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });

        if(localiza.length === 0) {
            throw new HttpException("Nenhum usuário encontrado!", HttpStatus.NOT_FOUND)
        }

        return localiza
    }

    async findByEmail(email: string): Promise<Usuario> {
        const localiza = await this.usuarioRepository.findOne({
            where: {
                usuario : ILike(`%${email}%`)
            }
        });

        if(!localiza) {
           throw new HttpException("Nenhum usuário localizado com o email " + email, HttpStatus.NOT_FOUND) 
        }
        return localiza
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const localiza = await this.findByEmailExato(usuario.usuario);

        if (localiza) {
            throw new HttpException("Email já cadastrado!", HttpStatus.BAD_REQUEST);
        }

        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BadRequestException("Não foi possível criar um usuário");
  }
}

async update(usuario: Usuario): Promise<Usuario> {
    const localizaId = await this.findById(usuario.id);
    const localizaEmail = await this.findByEmailExato(usuario.usuario);

    if (localizaEmail && localizaEmail.id !== usuario.id) {
        throw new HttpException("Email já está cadastrado",HttpStatus.BAD_REQUEST);
    }

    try {
        if (usuario.senha) {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
        const atualizado = this.usuarioRepository.merge(localizaId, usuario);  // O merge combina os dados do usuário vindo do banco (localizaId) com os novos dados recebidos (usuario), preservando campos que não foram enviados
        return await this.usuarioRepository.save(atualizado);
    } catch (error) {
        throw new BadRequestException("Não foi possível atualizar um usuário");
    }
}

    async delete(id: number): Promise<DeleteResult> {
        const localiza = await this.findById(id);
            if(!localiza) {
                throw new HttpException("Usuário com o id " + id + "não foi encontrado", HttpStatus.NOT_FOUND)
            }
        try {
                return await this.usuarioRepository.delete(id);
            } catch (error) {
                throw new HttpException("Falha ao deletar!", HttpStatus.BAD_REQUEST)
            }
    }


    //metodos auxiliares usados somente aqui no service
    //localiza email exato para validações se email já está cadastrado no banco de dados
    
    async findByEmailExato(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
        where: {
            usuario: email
        }
    });
}


}