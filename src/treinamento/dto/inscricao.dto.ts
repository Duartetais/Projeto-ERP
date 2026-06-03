import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { StatusInscricao } from '../entities/inscricao.entity';

export class InscricaoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  treinamentoId: number;

  @ApiProperty({ example: '2025-07-01' })
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({ enum: StatusInscricao })
  @IsOptional() @IsEnum(StatusInscricao)
  status?: StatusInscricao;

  @ApiPropertyOptional({ example: 8.5 })
  @IsOptional() @IsNumber() @Min(0) @Max(10)
  nota?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  observacao?: string;
}