import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "../usuario/usuario.module";
import { AutenticacaoController } from "./controllers/autenticacao.controller";
import { JwtStrategy } from "./estrategias/jwt.strategy";
import { AutenticacaoService } from "./services/autenticacao.service";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'workly_peoplecore_secret',
            signOptions: {
                expiresIn: '2h',
            },
        }),
    ],
    controllers: [
        AutenticacaoController
    ],
    providers: [
        AutenticacaoService,
        JwtStrategy
    ],
    exports: [
        AutenticacaoService
    ]
})
export class AutenticacaoModule { }