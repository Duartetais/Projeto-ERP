import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { FolhaService } from '../services/folha.service';
import { CalcularFolhaDto } from '../dto/calcular-folha.dto';

@ApiTags('Folha de Pagamento')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('folha')
export class FolhaController {
  constructor(private readonly service: FolhaService) {}

  @Get()
  @Roles(Role.ADMIN, Role.RH)
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RH)
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Post('calcular')
  @Roles(Role.ADMIN, Role.RH)
  @HttpCode(HttpStatus.CREATED)
  calcular(@Body() dto: CalcularFolhaDto) { return this.service.calcular(dto); }

  @Put(':id/pagar')
  @Roles(Role.ADMIN, Role.RH)
  confirmarPagamento(@Param('id', ParseIntPipe) id: number) {
    return this.service.confirmarPagamento(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}