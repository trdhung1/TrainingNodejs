/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// eslint-disable-next-line prettier/prettier
import mongoose, { Document } from 'mongoose';
import { Member } from './member.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  projectName: string;

  @Prop()
  status: string;

  @Prop()
  openDate: Date;

  @Prop()
  endDate: Date;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: Member.name}])
  members: string[];

  @Prop()
  projectManager: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
