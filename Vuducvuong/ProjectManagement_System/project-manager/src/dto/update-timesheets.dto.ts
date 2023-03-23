/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateTimesheetsDto } from "./create-timesheets.dto";

export class UpdateTimesheetsDto extends PartialType(CreateTimesheetsDto){

}