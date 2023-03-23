/* eslint-disable prettier/prettier */
import { User } from '../entities/user.entity';
import {  IsNotEmpty, IsEnum} from 'class-validator';
import { Role } from '../role/role.enum';
import { StatusUser } from '../enum/status-user.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends User {
    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty( {enum: Role} )
    @IsEnum(Role)
    roles: Role;

    @ApiProperty()
    @IsEnum(StatusUser)
    status: StatusUser;
    
}
