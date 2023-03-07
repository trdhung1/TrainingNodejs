/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import mongoose, { Document, ObjectId } from 'mongoose';
import { Member } from './member.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  projectName: string;

  @Prop()
  status: string;

  @Prop()
  openDate: Date;

  @Prop()
  endDate: Date;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: Member.name}])
  @Type(() => Member)
  members: Member;

  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Member.name})
  @Type(() => Member)
  projectManager: Member;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
