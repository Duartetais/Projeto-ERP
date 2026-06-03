import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { AsoService } from '../services/aso.service';
import { CreateAsoDto } from '../dto/create-aso.dto';

@ApiTags('SST — ASOs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/asos')
export class AsoController {
  constructor(private readonly service: AsoService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('vencidos')
  findVencidos() { return this.service.findVencidos(); }

  @Get('proximos-vencer')
  @ApiQuery({ name: 'dias', required: false, example: 30 })
  findProximosVencer(@Query('dias') dias?: number) {
    return this.service.findProximosVencer(dias ? +dias : 30);
  }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Post()
  @Roles(Role.ADMIN, Role.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAsoDto) { return this.service.create(dto); }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}