/* eslint-disable prettier/prettier */
import {  IsNotEmpty } from 'class-validator';
export class ProjectManagerdDto {
  @IsNotEmpty()
  id : string;
}