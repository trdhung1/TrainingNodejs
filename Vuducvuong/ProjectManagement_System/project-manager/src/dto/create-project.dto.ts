/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { StatusProject } from '../enum/status-project.enum';
import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
      @IsEnum(StatusProject)
      status: StatusProject;
    }
