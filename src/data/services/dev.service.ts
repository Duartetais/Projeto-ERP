import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ConfigService } from '@nestjs/config';
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
      type: this.configService.get<string>('DB_TYPE') as any,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [Categoria, Funcionario, Usuario],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE'),
    };
  }
}