import { Module } from '@nestjs/common';
import { IaService } from './services/ia.service';
import { GeminiService } from './services/gemini.service';
import { GroqService } from './services/groq.service';
import { IaController } from './controllers/ia.controller';

@Module({
  providers:   [IaService, GeminiService, GroqService],
  controllers: [IaController],
  exports:     [IaService],
})
export class IaModule {}