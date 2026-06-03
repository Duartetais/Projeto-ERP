import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";
 
@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
 
  // ✅ Correção: injetar ConfigService igual ao DevService (padrão consistente)
  constructor(private configService: ConfigService) {}
 
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: false, // ✅ false em produção — nunca alterar schema automaticamente em prod
      // ✅ Correção: entidades listadas explicitamente (sem autoLoadEntities) — seguro no Docker
      entities: [Categoria, Funcionario, Usuario],
    };
  }
}
 
