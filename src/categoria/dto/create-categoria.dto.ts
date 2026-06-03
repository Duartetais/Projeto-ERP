import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Tecnologia da Informação' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  departamento!: string;
}