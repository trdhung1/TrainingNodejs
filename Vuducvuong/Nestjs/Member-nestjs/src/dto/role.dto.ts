/* eslint-disable prettier/prettier */
import {  IsIn, IsNotEmpty } from 'class-validator';
export class RoledDto {
  @IsNotEmpty()
  @IsIn(['Admin', 'HR', 'PM', 'User'])
  role: string;
}