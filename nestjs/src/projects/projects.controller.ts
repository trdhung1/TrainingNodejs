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
import { Role, Roles } from 'src/auth/decorators/auth.decorator';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  getAllProject() {
    return this.projectService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    return this.projectService.create(createProject);
  }
  @Roles(Role.ADMIN)
  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProject: UpdateProjectDto,
  ) {
    return this.projectService.updateProjectById(id, updateProject);
  }

  @Roles(Role.PM)
  @Get(':id/members')
  getMembersByProjectId(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getMembersByProjectId(id);
  }
}
