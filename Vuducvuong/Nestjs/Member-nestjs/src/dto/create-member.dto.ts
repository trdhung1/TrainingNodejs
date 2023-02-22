/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Member } from '../entities/member.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateMemberDto extends Member {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    userName: string;
    
}
