/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put,Request } from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateMemberByPm } from '../dto/update-memberbyPm.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';
import { ProjectService } from './project.service';
@ApiBearerAuth()
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectsService: ProjectService) {}

  @Roles(Role.Admin)
  @Post()
  async Create(@Body() createProjectDto: CreateProjectDto){
    try{
      return await this.projectsService.create(createProjectDto);
    }
    catch(err)
    {
      throw new BadRequestException(err.message);
    }
    
  }
 
  @Get('getprojectbymember')
  GetProject(@Request() req)
  {
    return this.projectsService.findProject(req.user._id)
  }
  
  @Roles(Role.Admin)
  @Get()
  GetAllProject(){
    return this.projectsService.findAll();
  }
  
  @Roles(Role.Admin)
  @Get(':id')
  GetProjectById(@Param('id') id : string){
    return this.projectsService.GetById(id);
  }

  @Roles(Role.Pm)
  @Put('updatemember')
  UpdateMemberByPm(@Body() updateMemberDto: UpdateMemberByPm)
  {
    return this.projectsService.updateMember(updateMemberDto)
  }
  
  @Roles(Role.Admin)
  @Patch(':id')
  Update(@Param('id') id : string,
  @Body() updateProjectDto: UpdateProjectDto){
    return this.projectsService.update(id,updateProjectDto)
  }



  @Delete(':id')
  async Remove(@Param('id') id : string ){
    try {
     await this.projectsService.remove(id);
       return  'delete succesfull'
    }
    catch(err)
    {
      throw new BadRequestException(err)
    }
    
  }
}
