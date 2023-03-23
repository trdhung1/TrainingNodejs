/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsEnum } from 'class-validator';
import { Timesheets } from 'src/entities/timesheets';
import { StatusTimesheets } from 'src/enum/status-timesheets.enum';


export class CreateTimesheetsDto extends Timesheets {
 

  @ApiProperty()
  description: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  @IsEnum(StatusTimesheets)
  status: StatusTimesheets;
  
  @ApiProperty()
  userId: string;
}
