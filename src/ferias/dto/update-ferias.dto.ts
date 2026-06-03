import { PartialType } from '@nestjs/swagger';
import { SolicitarFeriasDto } from './solicitar-ferias.dto';
export class UpdateFeriasDto extends PartialType(SolicitarFeriasDto) {}