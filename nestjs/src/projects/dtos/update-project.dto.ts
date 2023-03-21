/* eslint-disable prettier/prettier */
import { CreateProjectDto, MemberProperty, Status } from './create-project.dto';
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
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
