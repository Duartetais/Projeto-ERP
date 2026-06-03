import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN       = 'ADMIN',
  RH          = 'RH',
  GESTOR      = 'GESTOR',
  COLABORADOR = 'COLABORADOR',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);