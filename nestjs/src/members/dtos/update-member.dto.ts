/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  CreateMemberDto,
  MemberProperty,
  Position,
  Role,
  Status,
} from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
