/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({example : 'nguyen'})
  username: string;

  @ApiProperty({example : 'vdn123'})
  password: string;
}
