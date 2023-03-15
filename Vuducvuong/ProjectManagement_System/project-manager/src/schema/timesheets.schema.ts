/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Project } from './project.schema';
import { User } from './users.schema';

export type TimesheetsDocument = Timesheets & Document;

@Schema()
export class Timesheets {
  @Prop()
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Project.name})
  @Type(() => Project)
  projectId: Project;

  @Prop()
  status: string;

  @Prop({type : mongoose.Schema.Types.ObjectId,ref: User.name})
  @Type(()=>User)
   userId: User;
}

export const TimeSheetsSchema = SchemaFactory.createForClass(Timesheets);
