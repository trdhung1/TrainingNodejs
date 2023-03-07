/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectManagerdDto } from 'src/dto/projectManager.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/FindProjectManager')
  findProjectManager(@Body() projectManagerDto: ProjectManagerdDto) {
    return this.projectService.findProjectManager(projectManagerDto)
  }
  @Get('/FindProject')
  findProject(@Body() projectManagerDto: ProjectManagerdDto) {
    return this.projectService.findProject(projectManagerDto)

  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateprojectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateprojectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.projectService.remove(id);
    return "delete successful"
  }
}
