import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsOptional,
  IsPositive, IsString, MaxLength,
} from 'class-validator';

export class CreateFuncionarioDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome!: string;

  @ApiProperty({ example: 'Desenvolvedora Backend' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cargo!: string;

  @ApiProperty({ example: 160 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  horasTrabalhadas!: number;

  @ApiProperty({ example: 25.50 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  salarioBase!: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  usuarioId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  categoriaId?: number;
}