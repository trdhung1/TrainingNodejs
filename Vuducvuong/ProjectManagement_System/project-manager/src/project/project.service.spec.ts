/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { ProjectModule } from './project.module';
import {  ProjectSchema } from '../schema/project.schema';
import { Project } from '../entities/project.entity';

jest.useFakeTimers({legacyFakeTimers: true});

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
      imports: [ProjectModule,MongooseModule.forRoot(
        'mongodb+srv://admin:admin@cluster0.xypbgjl.mongodb.net/projectmanagement_system',
      ),MongooseModule.forFeature([
        {
            name: Project.name,
            schema: ProjectSchema
        }
    ]),]
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Testing Project Service ', () => {
    it('testing get all method', () => {
      expect(typeof service.findAll()).not.toEqual(null);
    });
  });
  
});
