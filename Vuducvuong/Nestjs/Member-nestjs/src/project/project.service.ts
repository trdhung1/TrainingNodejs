/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectManagerdDto } from 'src/dto/projectManager.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto'
import { Project, ProjectDocument } from '../schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel({
      ...createProjectDto,
    });
    await project.populate('members');
    await project.populate('projectManager')
    return  project.save();
  }

  async findAll(): Promise<ProjectDocument[]> {
    return await this.projectModel.find().populate('members');
  }

  async findProjectManager(projectManagerDto: ProjectManagerdDto): Promise<any> {
      const project = await this.projectModel.findOne({ _id: projectManagerDto.id });
      if (!project ) {
       throw new BadRequestException("wrong id");
      }
      return await this.projectModel.findOne({ _id: projectManagerDto.id}).select('projectManager').populate('projectManager');
    }

    
  async findProject(projectManagerDto: ProjectManagerdDto): Promise<any> {
    const project = await this.projectModel.find({ members: projectManagerDto.id });
    if (!project ) {
     throw new BadRequestException("wrong id");
    }
    return await this.projectModel.find({ members: projectManagerDto.id}).populate('members');
  }
    

  async findOne(id: string) {
    return await this.projectModel.findById(id);
  }


  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
   try{
    await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
    return await this.projectModel.findOne({ _id: id })
   }
    catch(err)  
    {
      throw new BadRequestException(err.message,{ cause: new Error(), description: 'wrong id ' }) ;
    }
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndRemove(id);
  }
}
