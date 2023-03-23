/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entites/project.entity';
import { Position, Role, Status } from './dtos/create-member.dto';
import { Member } from './entities/member.entity';
import { MembersModule } from './members.module';
import { MembersService } from './members.service';

jest.useFakeTimers({
  legacyFakeTimers: true,
});

describe('MembersService', () => {
  let memberService: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
      imports: [
        MembersModule,
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
        TypeOrmModule.forFeature([Member]),
      ],
    }).compile();

    memberService = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });
  it('get all members', () => {
    expect(memberService.findAll()).not.toEqual(null);
  });

  it('get member by id', async () => {
    expect(await memberService.findById(4)).toEqual({
      id: 4,
      userName: 'User 3',
      fullName: 'User 3',
      email: 'user3@gmail.com',
      status: 'FULLTIME',
      role: 'USER',
      position: 'INTERN',
    });
  });
  //   it('create new member', () => {
  //     expect(
  //       memberService.createMember({
  //         userName: 'User 6',
  //         fullName: 'User 6',
  //         email: 'user6@gmail.com',
  //         password: '123456',
  //         status: Status.FULLTIME,
  //         role: Role.USER,
  //         position: Position.INTERN,
  //         onboardingMentor: {
  //           id: 2,
  //         },
  //       }),
  //     ).not.toEqual(null);
  //   });

  //   it('update member', () => {
  //     expect(
  //       memberService.updateMember(700, {
  //         userName: 'User 6',
  //         fullName: 'User 6',
  //         email: 'user4@gmail.com',
  //         password: '123456',
  //         status: Status.FULLTIME,
  //         role: Role.USER,
  //         position: Position.INTERN,
  //         onboardingMentor: {
  //           id: 2,
  //         },
  //       }),
  //     ).not.toEqual(null);
  //   });

  //   it('update password by email', () => {
  //     expect(
  //       memberService.updatePasswordByEmail({
  //         email: 'user5@gmail.com',
  //         password: '123456',
  //         newPassword: '12345678',
  //       }),
  //     ).not.toEqual(null);
  //   });

  //   it('getProjectsByMemberId', () => {
  //     expect(memberService.getProjectsByMemberId(3)).not.toEqual(null);
  //   });

  //   it('getPMByMemberId', () => {
  //     expect(memberService.getPMByMemberId(3000)).not.toEqual(null);
  //   });
});
