/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { Project } from '../entities/project.entity';
import { Status } from './statusproject.enum';

export class CreateProjectDto extends Project {
      @IsEnum(Status)
      status: Status;
    }

