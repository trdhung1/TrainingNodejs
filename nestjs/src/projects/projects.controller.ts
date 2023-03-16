import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  getAllProject() {
    return this.projectService.findAll();
  }
  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findById(id);
  }

  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    return this.projectService.create(createProject);
  }

  @Put()
  updateProject(@Body() updateProject) {
    return this.projectService.update(updateProject);
  }
}
