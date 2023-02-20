/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// eslint-disable-next-line prettier/prettier
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop()
    Name: string;

    @Prop()
    Age: number;

    @Prop()
    Address: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
