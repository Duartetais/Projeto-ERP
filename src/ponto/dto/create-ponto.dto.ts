import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoRegistro } from '../entities/registro-ponto.entity';

export class CreatePontoDto {
  @ApiProperty({ enum: TipoRegistro })
  @IsEnum(TipoRegistro)
  tipo: TipoRegistro;

  @ApiProperty({ example: '2025-06-01T08:00:00' })
  @IsDateString()
  dataHora: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacao?: string;

  @ApiPropertyOptional({ example: 'Sede - SP' })
  @IsOptional()
  @IsString()
  localizacao?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;
}