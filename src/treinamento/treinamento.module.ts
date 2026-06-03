import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treinamento } from './entities/treinamento.entity';
import { Inscricao } from './entities/inscricao.entity';
import { Certificado } from './entities/certificado.entity';
import { TreinamentoService } from './services/treinamento.service';
import { CertificadoService } from './services/certificado.service';
import { TreinamentoController } from './controllers/treinamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Treinamento, Inscricao, Certificado])],
  providers: [TreinamentoService, CertificadoService],
  controllers: [TreinamentoController],
  exports: [TreinamentoService, CertificadoService],
})
export class TreinamentoModule {}