import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { FuncionarioService } from './services/funcionario.service';
import { FuncionarioController } from './controllers/funcionario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Funcionario])],
    providers: [FuncionarioService],
    controllers: [FuncionarioController],
    exports: [TypeOrmModule]
})
export class FuncionarioModule {}