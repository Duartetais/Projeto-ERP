import {
  Controller, Get, HttpStatus, HttpCode,
  Param, ParseIntPipe, Post, Body, Put, Delete, UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../autenticacao/guards/jwt-auth.guard";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@ApiTags('Departamentos')
@Controller("/departamentos")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  // ✅ Leitura: pública (GET pode ser acessado sem autenticação)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(@Param('descricao') departamento: string): Promise<Categoria[]> {
    return this.categoriaService.findAllByDepartamento(departamento);
  }

  // ✅ Correção: escrita protegida com JwtAuthGuard
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.delete(id);
  }

}