import { Module } from '@nestjs/common';
import { EsocialService } from './services/esocial.service';
import { XmlBuilderService } from './services/xml-builder.service';
import { EsocialController } from './controllers/esocial.controller';

@Module({
  providers:   [EsocialService, XmlBuilderService],
  controllers: [EsocialController],
  exports:     [EsocialService],
})
export class EsocialModule {}