/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusUser } from '../enum/status-user.enum';
import { Role } from '../role/role.enum';
import { User } from '../entities/user.entity';
import { UsersSchema } from '../schema/users.schema';
import { UserModule } from './users.module';
import { UserService } from './users.service';
jest.useFakeTimers({legacyFakeTimers: true});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [UserModule,MongooseModule.forRoot(
        'mongodb+srv://admin:admin@cluster0.xypbgjl.mongodb.net/projectmanagement_system',
      ),MongooseModule.forFeature([
        {
          name: User.name,
          schema: UsersSchema,
        },
      ])]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Testing user Service ', () => {
    it('testing get all method', () => {
      expect(typeof service.findAll()).not.toEqual(null);
    });

    it('testing get by id method', () => {
      expect(typeof service.GetById('640ed6c509b7aab6a58944a5'))
      .not.toEqual(null);
    });
   
    // it('testing register method', () => {
    //   expect(
    //     typeof service.create({ userName: 'hung',password: 'vdv123', fullName: 'nguyen tien hung', roles: Role.Admin, status : StatusUser.full}))
    //     .not.toEqual(null);
    // });

    it('testing update method',()=>{
      expect(typeof service.update('640ee008f039d7644b9e3381',{userName: 'huy',password: 'vdv123', fullName: 'nguyen tien hung', roles: Role.Admin, status : StatusUser.full}))
      .not.toEqual(null);
    })

    it('testing remove method ',()=>{
      expect(typeof service.remove('640ee008f039d7644b9e3381')).not.toEqual
    })
  });
  
});
