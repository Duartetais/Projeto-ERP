import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class EntregaEpiDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  funcionarioId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  epiId: number;

  @ApiProperty({ example: 1 })
  @IsNumber() @Min(1)
  quantidade: number;

  @ApiProperty({ example: '2025-06-01' })
  @IsDateString()
  dataEntrega: string;

  @ApiPropertyOptional({ example: '2025-12-01' })
  @IsOptional() @IsDateString()
  dataProximaTroca?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  observacao?: string;
}