/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Member } from '../entities/member.entity';
import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';
export class CreateMemberDto extends Member {
    
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    userName: string;

    @IsIn(['Admin', 'HR', 'PM', 'User'])
    role: string;

    @IsIn(['Intern', 'Fresher', 'Junior', 'Mid', 'Senior'])
    position: string;
    
}
