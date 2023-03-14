/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.authentication(userName,password);
        if (!user) {
          throw new HttpException('wrong username or password', HttpStatus.NOT_FOUND);
        }

        return user;
      }

  async login(user: any) {
    const payload = { userName: user.userName, id: user._id , roles : user.roles};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
