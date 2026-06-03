import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { TipoMovimentacao } from '../entities/promocao.entity';

export class CreatePromocaoDto {
  @ApiProperty({ enum: TipoMovimentacao })
  @IsEnum(TipoMovimentacao)
  tipo: TipoMovimentacao;

  @ApiProperty({ example: 'Desenvolvedor Junior' })
  @IsNotEmpty()
  @IsString()
  cargoAnterior: string;

  @ApiProperty({ example: 'Desenvolvedor Pleno' })
  @IsNotEmpty()
  @IsString()
  cargoNovo: string;

  @ApiProperty({ example: 3000 })
  @IsNumber()
  @IsPositive()
  salarioAnterior: number;

  @ApiProperty({ example: 4500 })
  @IsNumber()
  @IsPositive()
  salarioNovo: number;

  @ApiPropertyOptional({ example: 'Excelente desempenho no último ciclo' })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;
}