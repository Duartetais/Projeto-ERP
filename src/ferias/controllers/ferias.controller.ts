import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { FeriasService } from '../services/ferias.service';
import { SolicitarFeriasDto } from '../dto/solicitar-ferias.dto';

@ApiTags('Férias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ferias')
export class FeriasController {
  constructor(private readonly service: FeriasService) {}

  @Get()
  @Roles(Role.ADMIN, Role.RH, Role.GESTOR)
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  solicitar(@Body() dto: SolicitarFeriasDto) { return this.service.solicitar(dto); }

  @Put(':id/aprovar')
  @Roles(Role.ADMIN, Role.RH, Role.GESTOR)
  aprovar(@Param('id', ParseIntPipe) id: number) { return this.service.aprovar(id); }

  @Put(':id/rejeitar')
  @Roles(Role.ADMIN, Role.RH, Role.GESTOR)
  rejeitar(@Param('id', ParseIntPipe) id: number, @Body('motivo') motivo: string) {
    return this.service.rejeitar(id, motivo);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}