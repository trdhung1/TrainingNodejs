/* eslint-disable prettier/prettier */

import { Test } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

describe('MembersController', () => {
  let membersController: MembersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService],
    }).compile();

    membersController = moduleRef.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(membersController).toBeDefined();
  });

  it('should get all members', () => {
    expect(membersController.getAllMembers()).not.toEqual(null);
  });
});
