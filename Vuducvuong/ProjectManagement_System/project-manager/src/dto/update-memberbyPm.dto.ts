/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMemberByPm {
  @ApiProperty()
  id:string;

  @ApiProperty()
  members: string;
}
