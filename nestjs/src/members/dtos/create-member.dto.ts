/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsEmail, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  HR = 'HR',
  PM = 'PM',
  USER = 'USER',
}

export enum Position {
  INTERN = 'INTERN',
  FRESHER = 'FRESHER',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
}

export enum Status {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}

export class CreateMemberDto {
  @IsString({message:'test'})
  userName: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Status)
  status: Status;

  @IsEnum(Role)
  role: Role;

  @IsEnum(Position)
  position: Position;

  @IsOptional()
  @IsInt()
  onboardingMentor: number;
}
