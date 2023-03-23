/* eslint-disable prettier/prettier */

import { ProjectsService } from './projects.service';
import { Project } from '../projects/entites/project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../members/entities/member.entity';
import { ProjectsModule } from './projects.module';

jest.useFakeTimers({
  legacyFakeTimers: true,
});

describe('ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
      imports: [
        ProjectsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          username: 'postgres',
          password: 'root',
          host: '127.0.0.1',
          port: 5432,
          database: 'vatek',
          synchronize: true,
          entities: [Member, Project],
        }),
        TypeOrmModule.forFeature([Project, Member]),
      ],
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectsService).toBeDefined();
  });

  it('get all projects', () => {
    expect(projectsService.findAll()).not.toEqual(null);
  });

  it('get project by id', () => {
    expect(projectsService.findById(1)).not.toEqual(null);
  });

  it('update project by id', () => {
    expect(projectsService.updateProjectById(1000, {})).not.toEqual(null);
  });
});
