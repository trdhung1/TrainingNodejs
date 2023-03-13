/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import { User } from '../entities/user.entity';
import { UserService } from './users.service';


describe('testing user Service', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne: () => ({ data: {} }) },
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
  });
  describe('Testing user Service ', () => {
    it('testing getById method', () => {
      expect(typeof userService.GetById('63f71441054df330a31b59c7')).not.equal(null);
    });
    it('testing register method', () => {
      expect(
        typeof userService.create({ username: 'hung',password: 'vdv123', fullname: 'nguyen tien hung', roles: 'Admin'})).not.equal(null);
    });
  });
});
