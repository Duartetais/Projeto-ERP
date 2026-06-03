import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusNR } from '../entities/nr-controle.entity';

export class CreateNrControleDto {
  @ApiProperty({ example: 'NR-5' })
  @IsString()
  numero: string;

  @ApiProperty({ example: 'CIPA' })
  @IsString()
  nome: string;

  @ApiPropertyOptional({ enum: StatusNR })
  @IsOptional() @IsEnum(StatusNR)
  status?: StatusNR;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  descricaoNaoConformidade?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  planoAcao?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional() @IsDateString()
  prazoAdequacao?: string;

  @ApiPropertyOptional({ example: '2025-06-01' })
  @IsOptional() @IsDateString()
  dataProximaAuditoria?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  responsavel?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  aplicavelEmpresa?: boolean;
}