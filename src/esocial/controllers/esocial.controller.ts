import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { EsocialService } from '../services/esocial.service';

@ApiTags('eSocial')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.RH)
@Controller('esocial')
export class EsocialController {
  constructor(private readonly service: EsocialService) {}

  @Post('s2200')
  gerarS2200(@Body() dados: any) {
    const xml = this.service.gerarS2200(dados);
    return { xml, valido: this.service.validarXml(xml).valido };
  }

  @Post('s2299')
  gerarS2299(@Body() dados: any) {
    const xml = this.service.gerarS2299(dados);
    return { xml, valido: this.service.validarXml(xml).valido };
  }

  @Post('validar')
  validarXml(@Body('xml') xml: string) {
    return this.service.validarXml(xml);
  }
}