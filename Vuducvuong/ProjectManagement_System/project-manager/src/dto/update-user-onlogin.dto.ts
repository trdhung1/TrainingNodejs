/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusUser } from "src/enum/status-user.enum";

export class UpdateUserLoginDto{
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    newUserName:string;

    newPassword: string;

    newFullName: string;

    @IsEnum(StatusUser)
    newStatus: StatusUser;
   
}