import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../members/entities/member.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entites/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  findById(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  create(createProject: CreateProjectDto) {
    return this.projectRepository.save(createProject);
  }

  async updateProjectById(id: number, updateProject: UpdateProjectDto) {
    try {
      const { members } = updateProject;
      const userList = await this.memberRepository.find();
      const idList = userList.map((user) => user.id);
      const newMembers = members?.filter((member) => {
        return idList.includes(member.id);
      });

      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
      const newProject = {
        ...project,
        ...updateProject,
        members: newMembers || project.members,
      };

      return this.projectRepository.save(newProject);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  getMembersByProjectId(id: number) {
    return this.projectRepository.findOne({
      relations: {
        members: true,
      },
      where: {
        id,
      },
    });
  }
}
