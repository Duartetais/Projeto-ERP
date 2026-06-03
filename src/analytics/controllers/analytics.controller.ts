import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';
import { AnalyticsService } from '../services/analytics.service';
import { HeadcountService } from '../services/headcount.service';
import { TurnoverService } from '../services/turnover.service';

@ApiTags('People Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.RH)
@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly headcountService: HeadcountService,
    private readonly turnoverService:  TurnoverService,
  ) {}

  @Get('dashboard')
  @ApiQuery({ name: 'ano', example: 2025 })
  @ApiQuery({ name: 'mes', example: 6 })
  dashboard(@Query('ano') ano: number, @Query('mes') mes: number) {
    return this.analyticsService.dashboardGeral(+ano, +mes);
  }

  @Get('dashboard/anual')
  @ApiQuery({ name: 'ano', example: 2025 })
  dashboardAnual(@Query('ano') ano: number) {
    return this.analyticsService.dashboardAnual(+ano);
  }

  @Get('headcount')
  headcountTotal() { return this.headcountService.headcountTotal(); }

  @Get('headcount/departamentos')
  headcountPorDepartamento() { return this.headcountService.headcountPorDepartamento(); }

  @Get('headcount/cargos')
  headcountPorCargo() { return this.headcountService.headcountPorCargo(); }

  @Get('folha/departamentos')
  custoFolha() { return this.headcountService.custoFolhaPorDepartamento(); }

  @Get('turnover')
  @ApiQuery({ name: 'ano', example: 2025 })
  @ApiQuery({ name: 'mes', example: 6 })
  turnover(@Query('ano') ano: number, @Query('mes') mes: number) {
    return this.turnoverService.calcularTaxaTurnover(+ano, +mes);
  }

  @Get('turnover/anual')
  @ApiQuery({ name: 'ano', example: 2025 })
  turnoverAnual(@Query('ano') ano: number) {
    return this.turnoverService.historicoPorAno(+ano);
  }
}