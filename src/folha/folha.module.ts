import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolhaPagamento } from './entities/folha-pagamento.entity';
import { Rubrica } from './entities/rubrica.entity';
import { FolhaService } from './services/folha.service';
import { CalculoInssService } from './services/calculo-inss.service';
import { CalculoIrrfService } from './services/calculo-irrf.service';
import { FolhaController } from './controllers/folha.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FolhaPagamento, Rubrica])],
  providers: [FolhaService, CalculoInssService, CalculoIrrfService],
  controllers: [FolhaController],
  exports: [FolhaService],
})
export class FolhaModule {}