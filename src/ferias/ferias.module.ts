import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ferias } from './entities/ferias.entity';
import { FeriasService } from './services/ferias.service';
import { CalculoFeriasService } from './services/calculo-ferias.service';
import { FeriasController } from './controllers/ferias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ferias])],
  providers: [FeriasService, CalculoFeriasService],
  controllers: [FeriasController],
  exports: [FeriasService],
})
export class FeriasModule {}