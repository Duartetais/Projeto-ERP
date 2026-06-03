import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { IaService, MensagemChat } from '../services/ia.service';

class ChatDto {
  mensagem!:  string;
  historico?: MensagemChat[];
  contexto?:  string;
}

class SstAnaliseDto {
  dadosEmpresa: any;
}

class TreinamentoSugestaoDto {
  cargo!:        string;
  departamento!: string;
  treinamentos!: string[];
  nrs!:          string[];
}

class ResumoRelatorioDto {
  dados!:          any;
  tipoRelatorio!:  string;
}

@ApiTags('IA — Assistente PeopleCore')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ia')
export class IaController {
  constructor(private readonly service: IaService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  chat(@Body() dto: ChatDto) {
    return this.service.chat(dto.mensagem, dto.historico ?? [], dto.contexto);
  }

  @Post('sst/analise')
  @HttpCode(HttpStatus.OK)
  analisarSST(@Body() dto: SstAnaliseDto) {
    return this.service.analisarConformidadeSST(dto.dadosEmpresa);
  }

  @Post('treinamentos/sugestao')
  @HttpCode(HttpStatus.OK)
  sugerirTreinamentos(@Body() dto: TreinamentoSugestaoDto) {
    return this.service.sugerirTreinamentos(dto);
  }

  @Post('relatorio/resumo')
  @HttpCode(HttpStatus.OK)
  resumirRelatorio(@Body() dto: ResumoRelatorioDto) {
    return this.service.resumirRelatorio(dto.dados, dto.tipoRelatorio);
  }
}