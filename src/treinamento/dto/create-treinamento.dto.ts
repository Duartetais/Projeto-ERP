import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ModalidadeTreinamento, TipoTreinamento } from '../entities/treinamento.entity';

export class CreateTreinamentoDto {
  @ApiProperty({ example: 'NR-35 Trabalho em Altura' })
  @IsNotEmpty() @IsString()
  nome: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  descricao?: string;

  @ApiProperty({ enum: TipoTreinamento })
  @IsEnum(TipoTreinamento)
  tipo: TipoTreinamento;

  @ApiProperty({ enum: ModalidadeTreinamento })
  @IsEnum(ModalidadeTreinamento)
  modalidade: ModalidadeTreinamento;

  @ApiProperty({ example: 8 })
  @IsInt() @Min(1)
  cargaHoraria: number;

  @ApiPropertyOptional({ example: 'NR-35' })
  @IsOptional() @IsString()
  nrRelacionada?: string;

  @ApiPropertyOptional({ example: 24, description: 'Validade em meses' })
  @IsOptional() @IsInt() @Min(1)
  validadeMeses?: number;
}