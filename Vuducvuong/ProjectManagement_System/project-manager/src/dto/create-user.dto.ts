/* eslint-disable prettier/prettier */
import { User } from '../entities/user.entity';
import {  IsNotEmpty, IsEnum} from 'class-validator';
import { Role } from '../role/role.enum';
import { StatusUser } from '../enum/status-user.enum';

export class CreateUserDto extends User {

    @IsNotEmpty()
    userName: string;
  
    @IsNotEmpty()
    password: string;

    @IsEnum(StatusUser)
    status: StatusUser;

    @IsEnum(Role)
    roles: Role;

    
}
