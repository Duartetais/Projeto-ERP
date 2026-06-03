import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CategoriaEPI } from '../entities/epi.entity';

export class CreateEpiDto {
  @ApiProperty({ example: 'Capacete de Segurança' })
  @IsString()
  nome: string;

  @ApiProperty({ enum: CategoriaEPI })
  @IsEnum(CategoriaEPI)
  categoria: CategoriaEPI;

  @ApiProperty({ example: '12345' })
  @IsString()
  numeroCa: string;

  @ApiProperty({ example: '2027-12-31' })
  @IsDateString()
  validadeCa: string;

  @ApiProperty({ example: '3M' })
  @IsString()
  fabricante: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  descricao?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional() @IsNumber() @Min(0)
  estoqueAtual?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional() @IsNumber() @Min(0)
  estoqueMinimo?: number;
}