/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/role/role.enum';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop()
  roles: Role[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
