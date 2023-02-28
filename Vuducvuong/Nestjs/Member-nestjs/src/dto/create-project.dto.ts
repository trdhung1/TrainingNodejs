/* eslint-disable prettier/prettier */
import { IsIn } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
      @IsIn(['Pendding', 'Running','Done'])
      status: string;
    }

