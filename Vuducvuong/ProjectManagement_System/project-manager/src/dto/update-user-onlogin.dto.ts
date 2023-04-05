/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty } from "class-validator";


export class UpdateUserLoginDto{
    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
   
    @ApiProperty()
    newPassword: string;

    
    
   
}