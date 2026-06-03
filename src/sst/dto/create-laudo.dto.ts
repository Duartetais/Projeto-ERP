import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoLaudo } from '../entities/laudo.entity';

export class CreateLaudoDto {
  @ApiProperty({ enum: TipoLaudo })
  @IsEnum(TipoLaudo)
  tipo: TipoLaudo;

  @ApiProperty({ example: 'Dr. Carlos Engenheiro' })
  @IsString()
  responsavelTecnico: string;

  @ApiPropertyOptional({ example: '12345-D/SP' })
  @IsOptional() @IsString()
  crea?: string;

  @ApiProperty({ example: '2025-01-01' })
  @IsDateString()
  dataEmissao: string;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  dataVencimento: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  descricao?: string;

  @ApiPropertyOptional({ example: 'https://storage/laudo.pdf' })
  @IsOptional() @IsString()
  urlDocumento?: string;

  @ApiPropertyOptional({ example: 'NR-15' })
  @IsOptional() @IsString()
  nrRelacionada?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional() @IsNumber()
  funcionarioId?: number;
}