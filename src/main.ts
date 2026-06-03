import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Filtro e interceptor globais
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
   origin: [
  'https://peoplecore.gbworks.com.br', // O servidor da colega (mantém o que já funciona)
  'http://192.168.15.10',
  'http://duuartetais.local',             // O SEU servidor físico para testes
  'http://localhost:5173'             // Desenvolvimento local
],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('PeopleCore ERP')
    .setDescription('API do sistema ERP de RH com autenticação JWT')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 PeopleCore rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger em: http://localhost:${process.env.PORT ?? 3000}/swagger`);
}

bootstrap();