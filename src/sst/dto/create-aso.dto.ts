import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoASO, ResultadoASO } from '../entities/aso.entity';

export class CreateAsoDto {
  @ApiProperty({ enum: TipoASO })
  @IsEnum(TipoASO)
  tipo: TipoASO;

  @ApiProperty({ enum: ResultadoASO })
  @IsEnum(ResultadoASO)
  resultado: ResultadoASO;

  @ApiProperty({ example: '2025-06-01' })
  @IsDateString()
  dataExame: string;

  @ApiPropertyOptional({ example: '2026-06-01' })
  @IsOptional() @IsDateString()
  dataProximoExame?: string;

  @ApiProperty({ example: 'Dr. Ana Médica' })
  @IsString()
  medicoResponsavel: string;

  @ApiPropertyOptional({ example: '54321/SP' })
  @IsOptional() @IsString()
  crm?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  observacao?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  restricoes?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  urlDocumento?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;
}