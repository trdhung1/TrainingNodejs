/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { User } from '../entities/user.entity';
import {  IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/role/role.enum';
export class CreateUserDto extends User {

    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    roles: Role[];

    
}
