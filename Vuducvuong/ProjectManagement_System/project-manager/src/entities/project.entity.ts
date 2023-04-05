/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { StatusProject } from '../enum/status-project.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Project {
  @ApiProperty({example: 'project'})
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({enum : StatusProject})
  @IsEnum(StatusProject)
  status: StatusProject;

  @ApiProperty()
  @IsDateString()
  createDate: Date;

  @ApiProperty()
  projectManager: string;

  @ApiProperty()
  members: string;

  @ApiProperty()
  @IsDateString()
  endDate: Date;
 
}
