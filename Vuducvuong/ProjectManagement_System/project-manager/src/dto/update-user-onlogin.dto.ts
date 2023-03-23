/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusUser } from "../enum/status-user.enum";

export class UpdateUserLoginDto{
    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
     
    @ApiProperty()
    newUserName:string;

    @ApiProperty()
    newPassword: string;

    @ApiProperty()
    newFullName: string;
    
    @ApiProperty()
    @IsEnum(StatusUser)
    newStatus: StatusUser;
   
}