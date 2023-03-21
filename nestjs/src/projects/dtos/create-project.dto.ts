/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class MemberProperty {
  @ApiProperty()
  id: number;
}

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  projectName: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    type: Date,
  })
  @IsDateString()
  openDate: string;

  @ApiProperty({
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  endDate: string;

  @ApiProperty({
    type: [MemberProperty],
    description: 'array id of member in project',
  })
  @IsArray()
  members: MemberProperty[];

  //   @IsInt()
  @ApiProperty({
    type: MemberProperty,
    description: 'id of member who manage project',
  })
  projectManager: MemberProperty;
}
