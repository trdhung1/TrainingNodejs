/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsDate,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
}

export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsEnum(Status)
  status: Status;

  @IsDateString()
  openDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsArray()
  members: Array<{ id: number }>;

  //   @IsInt()
  projectManager: { id: number };
}
