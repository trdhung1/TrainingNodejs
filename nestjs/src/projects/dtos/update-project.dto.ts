/* eslint-disable prettier/prettier */
import { CreateProjectDto, Status } from './create-project.dto';
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

export class UpdateProjectDto extends CreateProjectDto {
  @IsOptional()
  @IsString()
  projectName: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsDateString()
  openDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsArray()
  members: Array<{ id: number }>;

  //   @IsInt()
  projectManager: { id: number };
}
