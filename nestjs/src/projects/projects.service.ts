import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entites/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  findById(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  create(createProject) {
    return this.projectRepository.save(createProject);
  }

  async update(updateProject) {
    try {
      const { id } = updateProject;
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
      const newProject = { ...project, ...updateProject };
      return this.projectRepository.save(newProject);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
