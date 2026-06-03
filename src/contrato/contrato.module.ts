import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { ContratoService } from './services/contrato.service';
import { ContratoController } from './controllers/contrato.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato])],
  providers: [ContratoService],
  controllers: [ContratoController],
  exports: [ContratoService],
})
export class ContratoModule {}