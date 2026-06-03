import { Injectable } from '@nestjs/common';
import { TurnoverService } from './turnover.service';
import { HeadcountService } from './headcount.service';
import { AlertaSstService } from '../../sst/services/alerta-sst.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly turnoverService: TurnoverService,
    private readonly headcountService: HeadcountService,
    private readonly alertaSstService: AlertaSstService,
  ) {}

  async dashboardGeral(ano: number, mes: number): Promise<any> {
    const [
      headcountTotal,
      headcountPorDep,
      custoFolha,
      turnover,
      alertasSST,
    ] = await Promise.all([
      this.headcountService.headcountTotal(),
      this.headcountService.headcountPorDepartamento(),
      this.headcountService.custoFolhaPorDepartamento(),
      this.turnoverService.calcularTaxaTurnover(ano, mes),
      this.alertaSstService.gerarAlertas(),
    ]);

    return {
      headcount: {
        total:           headcountTotal,
        porDepartamento: headcountPorDep,
      },
      folha: {
        porDepartamento: custoFolha,
      },
      turnover,
      sst: {
        totalAlertas:   alertasSST.length,
        criticos:       alertasSST.filter(a => a.nivel === 'CRITICO').length,
        atencao:        alertasSST.filter(a => a.nivel === 'ATENCAO').length,
        alertas:        alertasSST,
      },
    };
  }

  async dashboardAnual(ano: number): Promise<any> {
    const [historicoTurnover, headcountPorCargo] = await Promise.all([
      this.turnoverService.historicoPorAno(ano),
      this.headcountService.headcountPorCargo(),
    ]);
    return { historicoTurnover, headcountPorCargo };
  }
}