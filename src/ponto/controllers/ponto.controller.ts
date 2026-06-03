import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { PontoService } from '../services/ponto.service';
import { CreatePontoDto } from '../dto/create-ponto.dto';
import { UpdatePontoDto } from '../dto/update-ponto.dto';

@ApiTags('Ponto Eletrônico')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ponto')
export class PontoController {
  constructor(private readonly service: PontoService) {}

  @Get()
  @Roles(Role.ADMIN, Role.RH, Role.GESTOR)
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Get('funcionario/:id/periodo')
  @ApiQuery({ name: 'inicio', example: '2025-06-01' })
  @ApiQuery({ name: 'fim',    example: '2025-06-30' })
  findByPeriodo(
    @Param('id', ParseIntPipe) id: number,
    @Query('inicio') inicio: string,
    @Query('fim')    fim: string,
  ) { return this.service.findByPeriodo(id, inicio, fim); }

  @Get('funcionario/:id/horas')
  @ApiQuery({ name: 'mes', example: 6 })
  @ApiQuery({ name: 'ano', example: 2025 })
  calcularHoras(
    @Param('id', ParseIntPipe) id: number,
    @Query('mes') mes: number,
    @Query('ano') ano: number,
  ) { return this.service.calcularHorasMes(id, +mes, +ano); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePontoDto) { return this.service.create(dto); }

  @Put(':id')
  @Roles(Role.ADMIN, Role.RH)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePontoDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/abonar')
  @Roles(Role.ADMIN, Role.RH)
  abonar(@Param('id', ParseIntPipe) id: number, @Body('observacao') obs: string) {
    return this.service.abonar(id, obs);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}