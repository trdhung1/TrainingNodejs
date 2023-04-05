/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsEnum, IsNotEmpty } from 'class-validator';
import { WorkingType } from 'src/enum/working-type.enum';
import { StatusTimesheets } from '../enum/status-timesheets.enum';

export class Timesheets {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({enum : StatusTimesheets})
  @IsEnum(StatusTimesheets)
  status: StatusTimesheets;


  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({enum : WorkingType})
  @IsNotEmpty()
  @IsEnum(WorkingType)
  workingtype: WorkingType;

  @ApiProperty()
  @IsNotEmpty()
  hours: number;
}
