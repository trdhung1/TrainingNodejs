/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import {UpdateProjectDto} from '../dto/update-project.dto'
import { Project, ProjectDocument } from '../schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModer : Model<ProjectDocument>,
  )  {}

  async create(createProjectDto : CreateProjectDto,) : Promise<ProjectDocument> {
    const project = new this.projectModer(createProjectDto);
    return await project.save();
  }

  async findAll(): Promise<ProjectDocument[]> {
    return await this.projectModer.find().exec();
  }

  async findOne(id: string) {
    return await this.projectModer.findById(id);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    await this.projectModer.findByIdAndUpdate(id, updateProjectDto);
    return await this.projectModer.findOne({_id: id})
  }

  async remove(id: string) {
    return await this.projectModer.findByIdAndRemove(id);
  }
}
