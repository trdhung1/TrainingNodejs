/* eslint-disable prettier/prettier */
import { BadRequestException,  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {  Model } from "mongoose";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateMemberByPm } from "../dto/update-memberbyPm.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Project, ProjectDocument } from "../schema/project.schema";


@Injectable()
export class ProjectService{
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel : Model<ProjectDocument>
    ){}
 
    public async create(createProjectDto : CreateProjectDto):Promise<ProjectDocument>{
        const check = await this.projectModel.findOne({projectName : createProjectDto.projectName})
        if(check){
            throw new BadRequestException('project name exist')
        }
        const project = new this.projectModel({
            ...createProjectDto,
          });
          await project.populate('members');
          await project.populate('projectManager')
          return  project.save();
        }
     
    public async updateMember(updateMemberDto : UpdateMemberByPm): Promise<ProjectDocument> 
    {
        try{
            const project = await this.projectModel.findOne({_id : updateMemberDto.id})
            project.members = updateMemberDto.members
            return project.save()
        }
        catch(err)
        {
            throw new BadRequestException(err.message,{cause: new Error(),description:'wrong id'})
        }
       
    }

    public async findAll():Promise<ProjectDocument[]>{
            return await this.projectModel.find().populate('members');
        }

    public async findProject(id : string)
    {
        const projects :ProjectDocument[] = await this.projectModel.find({members : id},{members: 0})
        return projects
    }
    
     public async GetById(id : string){
        try {
            const project = await this.projectModel.findOne({_id : id})
            return project;
        }
        catch(err){
           throw new BadRequestException(err.message)
        }
     }
     
     public async update(id : string ,updateProjectDto : UpdateProjectDto):Promise<ProjectDocument>{
           try{
            await this.projectModel.findByIdAndUpdate(id,updateProjectDto)
            return await this.projectModel.findOne({_id : id})
           }
           catch(err)
           {
            throw new BadRequestException(err.message,{cause : new Error(),description :'wrong id'})
           }
     }

     public async remove(id: string)
     {
        try{
            return await this.projectModel.findByIdAndRemove(id)
        }
        catch(err){
            throw new BadRequestException(err.message,{cause: new Error(),description: 'wrong id'})
        }
        
     }
}
