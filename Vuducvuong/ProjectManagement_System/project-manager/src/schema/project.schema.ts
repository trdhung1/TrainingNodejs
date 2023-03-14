/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from './users.schema';
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
  createDate: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  @Type(() => User)
  projectManager: User;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: User.name}])
  @Type(() => User)
  members: User;

  @Prop()
  endDate: Date;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
