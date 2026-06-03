import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SolicitarFeriasDto {
  @ApiProperty({ example: '2025-07-01' })
  @IsDateString()
  dataInicio!: string;

  @ApiProperty({ example: '2025-07-30' })
  @IsDateString()
  dataFim!: string;

  @ApiProperty({ example: 30 })
  @IsInt() @Min(5)
  diasFruidos!: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional() @IsBoolean()
  tercoVendido?: boolean;

  @ApiProperty({ example: 2024 })
  @IsInt()
  periodoAquisitivoAno!: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  observacao?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId!: number;
}