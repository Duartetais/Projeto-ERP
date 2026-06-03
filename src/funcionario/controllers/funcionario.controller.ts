import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, } from '@nestjs/common';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../entities/funcionario.entity';
import { DeleteResult } from 'typeorm';

@Controller('/funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  findAll(): Promise<Funcionario[]> {
    return this.funcionarioService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Funcionario> {
    return this.funcionarioService.findById(id);
  }

  @Post()
  create(@Body() funcionario: Funcionario): Promise<Funcionario> {
    return this.funcionarioService.create(funcionario);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() funcionario: Funcionario,
  ): Promise<Funcionario> {
    funcionario.id = id;
    return this.funcionarioService.update(funcionario);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.funcionarioService.delete(id);
  }
}
