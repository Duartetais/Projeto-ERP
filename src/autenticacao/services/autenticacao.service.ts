import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioLogin } from "../../usuario/models/usuario-login.model";
import { UsuarioService } from "../../usuario/services/usuario.service";

@Injectable()
export class AutenticacaoService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async login(usuarioLogin: UsuarioLogin): Promise<UsuarioLogin> {

        const usuario = await this.usuarioService.findByEmailExato(usuarioLogin.usuario);

        if (!usuario) {
            throw new HttpException("Usuário não encontrado!", HttpStatus.UNAUTHORIZED);
        }

        if (!usuarioLogin.senha) {
            throw new HttpException("Senha não informada!", HttpStatus.UNAUTHORIZED);
        }

        const senhaValida = await bcrypt.compare(usuarioLogin.senha, usuario.senha);

        if (!senhaValida) {
            throw new HttpException("Senha inválida!", HttpStatus.UNAUTHORIZED);
        }

        const payload = {
            sub: usuario.id,
            usuario: usuario.usuario
        };

        const token = this.jwtService.sign(payload);

        return {
            id: usuario.id,
            nome: usuario.nome,
            usuario: usuario.usuario,
            foto: usuario.foto,
            token: token
        };
    }

}