import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { ContratoService } from '../services/contrato.service';
import { CreateContratoDto } from '../dto/create-contrato.dto';
import { UpdateContratoDto } from '../dto/update-contrato.dto';

@ApiTags('Contratos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contratos')
export class ContratoController {
  constructor(private readonly service: ContratoService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) { return this.service.findByFuncionario(id); }

  @Post()
  @Roles(Role.ADMIN, Role.RH)
  create(@Body() dto: CreateContratoDto) { return this.service.create(dto); }

  @Put(':id')
  @Roles(Role.ADMIN, Role.RH)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContratoDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/encerrar')
  @Roles(Role.ADMIN, Role.RH)
  encerrar(@Param('id', ParseIntPipe) id: number, @Body('motivo') motivo: string) {
    return this.service.encerrar(id, motivo);
  }
}