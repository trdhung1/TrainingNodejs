/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.authentication(username,password);
        if (!user) {
         return null;
        }

        return user;
      }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id , roles : user.roles};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
