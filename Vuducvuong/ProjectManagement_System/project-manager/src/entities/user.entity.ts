/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusUser } from "../enum/status-user.enum";
import { Role } from "../role/role.enum";


export class User {
  @ApiProperty({example: 'trong'})
  @IsNotEmpty()
  userName: string;

  @ApiProperty({example: 'vdv123'})
  @IsNotEmpty()
  password: string;

  @ApiProperty({example: 'doduytrong'})
  fullName: string;

  @ApiProperty( {enum: Role} )
  @IsEnum(Role)
  roles: Role;

  @ApiProperty({enum: StatusUser})
  @IsEnum(StatusUser)
  status: StatusUser;
  }
  