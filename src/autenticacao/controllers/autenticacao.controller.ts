import { Body, Controller, Post } from "@nestjs/common";
import { AutenticacaoService } from "../services/autenticacao.service";
import { UsuarioLogin } from "../../usuario/models/usuario-login.model";

@Controller("/auth")
export class AutenticacaoController {

    constructor(
        private autenticacaoService: AutenticacaoService
    ) { }

    @Post("/login") // cria rota de login
    async login(@Body() usuarioLogin: UsuarioLogin): Promise<UsuarioLogin> {
        return await this.autenticacaoService.login(usuarioLogin);
    }

}