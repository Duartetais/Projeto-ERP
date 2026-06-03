import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class CalcularFolhaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;

  @ApiProperty({ example: 6 })
  @IsInt() @Min(1) @Max(12)
  mes: number;

  @ApiProperty({ example: 2025 })
  @IsInt() @Min(2020)
  ano: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional() @IsNumber()
  faltas?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional() @IsNumber() @IsPositive()
  horasExtras?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional() @IsNumber()
  adicionalInsalubridade?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional() @IsNumber()
  adicionalPericulosidade?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional() @IsNumber()
  outrosDescontos?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional() @IsNumber()
  outrosAcrescimos?: number;

  @ApiPropertyOptional()
  @IsOptional()
  observacao?: string;
}