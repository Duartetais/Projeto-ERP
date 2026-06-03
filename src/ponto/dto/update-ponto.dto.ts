import { PartialType } from '@nestjs/swagger';
import { CreatePontoDto } from './create-ponto.dto';
export class UpdatePontoDto extends PartialType(CreatePontoDto) {}