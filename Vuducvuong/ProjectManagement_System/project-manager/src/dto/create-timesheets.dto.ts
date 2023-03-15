/* eslint-disable prettier/prettier */
import {  IsEnum } from 'class-validator';
import { Timesheets } from 'src/entities/timesheets';
import { StatusTimesheets } from 'src/enum/status-timesheets.enum';


export class CreateTimesheetsDto extends Timesheets {
  @IsEnum(StatusTimesheets)
  status: StatusTimesheets;

}
