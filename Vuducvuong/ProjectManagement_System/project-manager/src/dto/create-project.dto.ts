/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { StatusProject } from '../enum/status-project.enum';
import { Project } from '../entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto extends Project {
  @ApiProperty()
  projectName: string;

  @ApiProperty()
  @IsEnum(StatusProject)
  status: StatusProject;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  projectManager: string;

  @ApiProperty()
  members: string;

  @ApiProperty()
  endDate: Date;
}
