/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateTimesheetsDto } from "./create-timesheets.dto";

export class UpdateTimesheetsDto extends PartialType(CreateTimesheetsDto){

}