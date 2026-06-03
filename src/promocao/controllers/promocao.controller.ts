import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatePromocaoDto } from '../dto/create-promocao.dto';
import { PromocaoService } from '../services/promocao.service';

@ApiTags('Promoções e Movimentações')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('promocoes')
export class PromocaoController {
  constructor(private readonly service: PromocaoService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePromocaoDto) { return this.service.create(dto); }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}