/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee, EmployeeDocument } from '../schema/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const employee = new this.employeeModel(createEmployeeDto);
    return await employee.save();
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return await this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    return await this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
    return await this.employeeModel.findOne({_id: id})
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndRemove(id);
  }
}
