/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { User } from '../entities/user.entity';
import {  IsIn, IsNotEmpty } from 'class-validator';
import { Role } from 'src/role/role.enum';
export class CreateUserDto extends User {

    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;

    @IsIn(['Admin', 'HR', 'PM', 'User'])
    roles: Role[];

    
}
