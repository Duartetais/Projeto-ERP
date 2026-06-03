import { Injectable, Logger } from '@nestjs/common';
import { XmlBuilderService } from './xml-builder.service';
import { buildS2200 } from '../events/s2200-admissao';

@Injectable()
export class EsocialService {
  private readonly logger = new Logger(EsocialService.name);

  constructor(private readonly xmlBuilder: XmlBuilderService) {}

  gerarS2200(dadosFuncionario: any): string {
    const evento = buildS2200({
      evtAdmissao: {
        ideEvento: {
          indRetif: 1,
          tpAmb:    Number(process.env.ESOCIAL_AMBIENTE) || 2,
          procEmi:  1,
          verProc:  '1.0',
        },
        ideEmpregador: {
          tpInsc: 1,
          nrInsc: process.env.ESOCIAL_CNPJ ?? '',
        },
        trabalhador: {
          cpfTrab:   dadosFuncionario.cpf,
          nmTrab:    dadosFuncionario.nome,
          sexo:      dadosFuncionario.sexo ?? 'M',
          racaCor:   dadosFuncionario.racaCor ?? 9,
          grauInstr: dadosFuncionario.grauInstr ?? 7,
          endereco:  { brasil: dadosFuncionario.endereco ?? {} },
        },
        vinculo: {
          matTrab:     String(dadosFuncionario.id),
          tpRegTrab:   1,
          tpRegPrev:   1,
          dtAdm:       dadosFuncionario.dataAdmissao,
          tpAdmissao:  1,
          indAdmissao: 0,
          cargo:       dadosFuncionario.cargo,
          cbo:         dadosFuncionario.cbo ?? '000000',
          natAtividade: 1,
          remuneracao: {
            vrSalFx:    dadosFuncionario.salarioBase,
            undSalFixo: 5,
          },
        },
      },
    });
    return this.xmlBuilder.buildXml(evento, 'evtAdmissao');
  }

  gerarS2299(dadosDesligamento: any): string {
    const evento = {
      evtDeslig: {
        ideEvento:      { indRetif: 1, tpAmb: 2, procEmi: 1, verProc: '1.0' },
        ideEmpregador:  { tpInsc: 1, nrInsc: process.env.ESOCIAL_CNPJ ?? '' },
        ideTrabalhador: { cpfTrab: dadosDesligamento.cpf },
        infoDeslig: {
          matTrab:   String(dadosDesligamento.funcionarioId),
          dtDeslig:  dadosDesligamento.dataRescisao,
          mtvDeslig: dadosDesligamento.motivoCodigo ?? '01',
          verbasResc: { dmDev: [] },
        },
      },
    };
    return this.xmlBuilder.buildXml(evento, 'evtDeslig');
  }

  validarXml(xml: string): { valido: boolean; erros: string[] } {
    const erros: string[] = [];
    if (!xml.includes('<?xml')) erros.push('Cabeçalho XML ausente');
    if (!xml.includes('<eSocial')) erros.push('Tag eSocial ausente');
    this.logger.log(`XML validado — ${erros.length} erro(s)`);
    return { valido: erros.length === 0, erros };
  }
}