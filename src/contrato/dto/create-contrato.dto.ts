import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoContrato } from '../entities/contrato.entity';

export class CreateContratoDto {
  @ApiProperty({ enum: TipoContrato })
  @IsEnum(TipoContrato)
  tipo!: TipoContrato;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  dataAdmissao!: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsDateString()
  dataFimExperiencia?: string;

  @ApiPropertyOptional({ example: '12345/001-6' })
  @IsOptional()
  @IsString()
  ctps?: string;

  @ApiPropertyOptional({ example: '12345678901' })
  @IsOptional()
  @IsString()
  pis?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId!: number;
}