/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';


jest.mock('../users/users.service');

describe.only('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
      ],
      providers: [
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user ok', async () => {
    const res = await service.validateUser('username','password');
    expect(res).toBeDefined();
  });
});