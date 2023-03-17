import { Status } from 'src/members/dtos/create-member.dto';
import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
/* eslint-disable prettier/prettier */
export class RegisterUserDto {
  @IsString()
  userName: string;
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsEnum(Status)
  status: Status;
}
