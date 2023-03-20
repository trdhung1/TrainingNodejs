/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger/dist';

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
  @ApiProperty({
    description: 'User Name of member',
  })
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: Status })
  @ApiProperty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: Role })
  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsEnum(Position)
  position: Position;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  onboardingMentor: number;
}
