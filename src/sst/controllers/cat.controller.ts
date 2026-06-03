import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { CatService } from '../services/cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';

@ApiTags('SST — CAT Acidentes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sst/cat')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFuncionario(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.service.findById(id); }

  @Post()
  @Roles(Role.ADMIN, Role.RH)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCatDto) { return this.service.create(dto); }

  @Put(':id/esocial')
  @Roles(Role.ADMIN, Role.RH)
  marcarEnviado(
    @Param('id', ParseIntPipe) id: number,
    @Body('protocolo') protocolo: string,
  ) { return this.service.marcarEnviadoEsocial(id, protocolo); }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) { return this.service.delete(id); }
}