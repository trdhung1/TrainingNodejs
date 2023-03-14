/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



export type UsersDocument = User & Document;

@Schema()
export class User {
  
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  roles: string;

  @Prop()
  status: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
