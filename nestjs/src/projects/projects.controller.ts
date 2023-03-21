import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/auth/decorators/auth.decorator';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @ApiOperation({ summary: 'get all project' })
  @Get()
  getAllProject() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'get project by id' })
  @Roles(Role.ADMIN)
  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ summary: 'create new project' })
  @Roles(Role.ADMIN)
  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    return this.projectService.create(createProject);
  }

  @ApiOperation({ summary: 'update project' })
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProject: UpdateProjectDto,
  ) {
    return this.projectService.updateProjectById(id, updateProject);
  }

  @ApiOperation({ summary: 'get all members of project' })
  @Roles(Role.PM)
  @Get(':id/members')
  getMembersByProjectId(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getMembersByProjectId(id);
  }
}
