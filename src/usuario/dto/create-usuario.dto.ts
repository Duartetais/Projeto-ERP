import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  nome!: string;

  @ApiProperty({ example: 'joao@empresa.com' })
  @IsEmail()
  @IsNotEmpty()
  usuario!: string;

  @ApiProperty({ example: 'senha123', minLength: 8 })
  @IsNotEmpty()
  @MinLength(8)
  senha!: string;

  @ApiPropertyOptional({ example: 'https://foto.url/foto.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional({ example: 'ADMIN', enum: ['ADMIN','RH','GESTOR','COLABORADOR'] })
  @IsOptional()
  @IsString()
  role?: string;
}