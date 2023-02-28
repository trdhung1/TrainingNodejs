/* eslint-disable prettier/prettier */
import {  IsNotEmpty } from 'class-validator';
export class resetPasswordDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  passwordreset: string;
}
