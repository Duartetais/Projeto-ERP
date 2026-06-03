import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laudo } from './entities/laudo.entity';
import { Aso } from './entities/aso.entity';
import { Epi } from './entities/epi.entity';
import { EntregaEpi } from './entities/entrega-epi.entity';
import { Cat } from './entities/cat.entity';
import { NrControle } from './entities/nr-controle.entity';
import { Cipa } from './entities/cipa.entity';
import { RiscoAmbiental } from './entities/risco-ambiental.entity';
import { LaudoService } from './services/laudo.service';
import { AsoService } from './services/aso.service';
import { EpiService } from './services/epi.service';
import { CatService } from './services/cat.service';
import { NrControleService } from './services/nr-controle.service';
import { AlertaSstService } from './services/alerta-sst.service';
import { LaudoController } from './controllers/laudo.controller';
import { AsoController } from './controllers/aso.controller';
import { EpiController } from './controllers/epi.controller';
import { CatController } from './controllers/cat.controller';
import { NrControleController } from './controllers/nr-controle.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Laudo, Aso, Epi, EntregaEpi,
      Cat, NrControle, Cipa, RiscoAmbiental,
    ]),
  ],
  providers: [
    LaudoService, AsoService, EpiService,
    CatService, NrControleService, AlertaSstService,
  ],
  controllers: [
    LaudoController, AsoController, EpiController,
    CatController, NrControleController,
  ],
  exports: [LaudoService, AsoService, EpiService, CatService, AlertaSstService],
})
export class SstModule {}