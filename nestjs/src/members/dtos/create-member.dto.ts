/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
export class MemberProperty {
  @ApiProperty()
  id: number;
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
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ enum: Position })
  @IsEnum(Position)
  position: Position;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => MemberProperty)
  onboardingMentor: MemberProperty;
}
