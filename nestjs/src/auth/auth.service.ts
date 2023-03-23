import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { create } from 'domain';
import {
  CreateMemberDto,
  Position,
  Role,
} from 'src/members/dtos/create-member.dto';
import { MembersService } from 'src/members/members.service';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { ResetPasswordDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.membersService.findByEmail(username);

    const isMatch = await comparePassword(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      //return user has no password
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  register(createUser) {
    const user = { ...createUser, role: Role.USER, position: Position.INTERN };
    return this.membersService.createMember(user);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.membersService.updatePasswordByEmail(resetPasswordDto);
  }
}
