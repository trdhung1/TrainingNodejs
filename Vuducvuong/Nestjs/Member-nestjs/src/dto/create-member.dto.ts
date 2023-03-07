/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Member } from '../entities/member.entity';
import { IsEmail, IsNotEmpty, IsIn, IsEnum } from 'class-validator';
import { StatusMember } from './statusmember.enum';
export class CreateMemberDto extends Member {
    
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    userName: string;

    @IsEnum(StatusMember)
    status: StatusMember;

    @IsIn(['Admin', 'HR', 'PM', 'User'])
    role: string;

    @IsIn(['Intern', 'Fresher', 'Junior', 'Mid', 'Senior'])
    position: string;
    
}
