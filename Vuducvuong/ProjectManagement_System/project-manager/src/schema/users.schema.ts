/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';



export type UsersDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
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
