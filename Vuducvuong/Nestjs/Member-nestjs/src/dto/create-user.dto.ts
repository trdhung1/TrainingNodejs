/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { User } from '../entities/user.entity';
import {  IsNotEmpty } from 'class-validator';
export class CreateUserDto extends User {

    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;

    
}
