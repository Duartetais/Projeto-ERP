import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

// Módulos existentes
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

// Módulos novos
import { PromocaoModule } from './promocao/promocao.module';
import { ContratoModule } from './contrato/contrato.module';
import { PontoModule } from './ponto/ponto.module';
import { FolhaModule } from './folha/folha.module';
import { FeriasModule } from './ferias/ferias.module';
import { SstModule } from './sst/sst.module';
import { EsocialModule } from './esocial/esocial.module';
import { TreinamentoModule } from './treinamento/treinamento.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useClass: process.env.NODE_ENV === 'production' ? ProdService : DevService,
    }),

    // Auth e usuários
    AutenticacaoModule,
    UsuarioModule,

    // Core RH
    CategoriaModule,
    FuncionarioModule,
    PromocaoModule,
    ContratoModule,

    // Operacional
    PontoModule,
    FolhaModule,
    FeriasModule,

    // Compliance
    SstModule,
    EsocialModule,
    TreinamentoModule,

    // Inteligência
    AnalyticsModule,
    IaModule,
  ],
  controllers: [AppController],
  providers:   [DevService, ProdService],
})
export class AppModule {}