import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPonto } from './entities/registro-ponto.entity';
import { PontoService } from './services/ponto.service';
import { PontoController } from './controllers/ponto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroPonto])],
  providers: [PontoService],
  controllers: [PontoController],
  exports: [PontoService],
})
export class PontoModule {}