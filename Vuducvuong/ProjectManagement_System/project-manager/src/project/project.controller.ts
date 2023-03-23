/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateMemberByPm } from '../dto/update-memberbyPm.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectsService: ProjectService) {}

  @Roles(Role.Admin)
  @Post()
  Create(@Body() createProjectDto: CreateProjectDto){
    return this.projectsService.create(createProjectDto);
  }

  @Get('getproject')
  GetProject(@Body() id: string)
  {
    return this.projectsService.findProject(id)
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
  @Put(':id')
  Update(@Param('id') id : string,
  @Body() updateProjectDto: UpdateProjectDto){
    return this.projectsService.update(id,updateProjectDto)
  }

  @Delete(':id')
  Remove(@Param('id') id : string ){
    this.projectsService.remove(id);
    return 'delete succesfull'
  }
}
