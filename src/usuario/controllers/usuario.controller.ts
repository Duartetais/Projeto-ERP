import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";
import { JwtAuthGuard } from "../../autenticacao/guards/jwt-auth.guard";

@Controller("usuarios")
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) { }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
        return await this.usuarioService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/usuario/:usuario")
    @HttpCode(HttpStatus.OK)
    findByEmail(@Param('usuario') email: string): Promise<Usuario> {
        return this.usuarioService.findByEmail(email)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Usuario[]> {
        return this.usuarioService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(Usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.delete(id);
    }
}