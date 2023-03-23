/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { UsersDocument } from 'src/schema/users.schema';
import { Payload } from 'src/interfaces/payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<UsersDocument> {
    const user = await this.usersService.authentication(userName,password);
        if (!user) {
          throw new HttpException('wrong username or password', HttpStatus.NOT_FOUND);
        }

        return user;
      }

  async login(user: Payload) {
    const payload = { userName: user.userName, id: user.id , roles : user.roles};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
