/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// eslint-disable-next-line prettier/prettier
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop()
  userName: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  stastus: string;

  @Prop()
  role: string;

  @Prop()
  onboardingMentor: string;

  @Prop()
  position: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
