import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocao } from './entities/promocao.entity';
import { PromocaoService } from './services/promocao.service';
import { PromocaoController } from './controllers/promocao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Promocao])],
  providers: [PromocaoService],
  controllers: [PromocaoController],
  exports: [PromocaoService],
})
export class PromocaoModule {}