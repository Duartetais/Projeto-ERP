import { Injectable } from '@nestjs/common';
import { AsoService } from './aso.service';
import { LaudoService } from './laudo.service';
import { EpiService } from './epi.service';
import { NrControleService } from './nr-controle.service';

export interface AlertaSST {
  tipo: string;
  nivel: 'CRITICO' | 'ATENCAO' | 'INFO';
  mensagem: string;
  referencia?: any;
}

@Injectable()
export class AlertaSstService {
  constructor(
    private readonly asoService: AsoService,
    private readonly laudoService: LaudoService,
    private readonly epiService: EpiService,
    private readonly nrService: NrControleService,
  ) {}

  async gerarAlertas(): Promise<AlertaSST[]> {
    const alertas: AlertaSST[] = [];

    const asosVencidos = await this.asoService.findVencidos();
    asosVencidos.forEach(a => alertas.push({
      tipo: 'ASO_VENCIDO',
      nivel: 'CRITICO',
      mensagem: `ASO vencido — ${a.funcionario?.nome ?? 'Funcionário'} (${a.tipo})`,
      referencia: a,
    }));

    const asosProximos = await this.asoService.findProximosVencer(30);
    asosProximos.forEach(a => alertas.push({
      tipo: 'ASO_VENCENDO',
      nivel: 'ATENCAO',
      mensagem: `ASO vence em 30 dias — ${a.funcionario?.nome ?? 'Funcionário'}`,
      referencia: a,
    }));

    const laudosProximos = await this.laudoService.findProximosVencer(30);
    laudosProximos.forEach(l => alertas.push({
      tipo: 'LAUDO_VENCENDO',
      nivel: 'ATENCAO',
      mensagem: `Laudo ${l.tipo} vence em 30 dias`,
      referencia: l,
    }));

    const casVencidos = await this.epiService.findCasVencidos();
    casVencidos.forEach(e => alertas.push({
      tipo: 'CA_VENCIDO',
      nivel: 'CRITICO',
      mensagem: `CA do EPI "${e.nome}" está vencido (CA: ${e.numeroCa})`,
      referencia: e,
    }));

    const estoqueBaixo = await this.epiService.findEstoqueMinimo();
    estoqueBaixo.forEach(e => alertas.push({
      tipo: 'ESTOQUE_EPI_BAIXO',
      nivel: 'ATENCAO',
      mensagem: `Estoque baixo: ${e.nome} (${e.estoqueAtual} un.)`,
      referencia: e,
    }));

    const nrsNaoConformes = await this.nrService.findNaoConformes();
    nrsNaoConformes.forEach(nr => alertas.push({
      tipo: 'NR_NAO_CONFORME',
      nivel: 'CRITICO',
      mensagem: `Não conformidade: ${nr.numero} — ${nr.nome}`,
      referencia: nr,
    }));

    return alertas;
  }
}