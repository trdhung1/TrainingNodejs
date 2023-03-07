/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import { Document, ObjectId } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  userName: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  status: string;

  @Prop()
  role: string;

  @Prop()
  onboardingMentor: string;

  @Prop()
  position: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
