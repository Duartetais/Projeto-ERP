import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [UsuarioService], // adiciona o serviço de usuário ao array de providers do módulo para que ele possa ser injetado em outros componentes da aplicação, como controllers ou outros services.
  controllers: [UsuarioController], // adiciona o controller de usuário ao array de controllers do módulo para que ele possa ser utilizado para lidar com as requisições relacionadas aos usuários.
  exports: [UsuarioService],
})
export class UsuarioModule {}