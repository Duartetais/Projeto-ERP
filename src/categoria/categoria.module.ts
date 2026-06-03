import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])], 
  providers: [CategoriaService], // adiciona o serviço de usuário ao array de providers do módulo para que ele possa ser injetado em outros componentes da aplicação, como controllers ou outros services.
  controllers: [CategoriaController], // adiciona o controller de usuário ao array de controllers do módulo para que ele possa ser utilizado para lidar com as requisições relacionadas aos usuários.
  exports: [CategoriaService],
})
export class CategoriaModule {}