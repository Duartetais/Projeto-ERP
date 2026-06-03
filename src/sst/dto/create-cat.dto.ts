import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoCAT, GravidadeAcidente } from '../entities/cat.entity';

export class CreateCatDto {
  @ApiProperty({ enum: TipoCAT })
  @IsEnum(TipoCAT)
  tipo: TipoCAT;

  @ApiProperty({ enum: GravidadeAcidente })
  @IsEnum(GravidadeAcidente)
  gravidade: GravidadeAcidente;

  @ApiProperty({ example: '2025-06-01T10:30:00' })
  @IsDateString()
  dataAcidente: string;

  @ApiProperty({ example: 'Queda de nível ao descer escada' })
  @IsString()
  descricaoAcidente: string;

  @ApiProperty({ example: 'Tornozelo direito' })
  @IsString()
  parteAtingida: string;

  @ApiProperty({ example: 'Piso molhado' })
  @IsString()
  agenteCausador: string;

  @ApiPropertyOptional({ example: 'Corredor B - Almoxarifado' })
  @IsOptional() @IsString()
  localAcidente?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  planoAcao?: string;

  @ApiPropertyOptional({ example: '2025-06-01' })
  @IsOptional() @IsDateString()
  dataAfastamento?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;
}