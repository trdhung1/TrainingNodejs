/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
export enum Role {
  ADMIN = 'ADMIN',
  HR = 'HR',
  PM = 'PM',
  USER = 'USER',
}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
