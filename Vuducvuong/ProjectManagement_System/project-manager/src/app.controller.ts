/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Post, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './users/public.decorator';
import { UserService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService,private userService : UserService ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  // @Post('register')
  // async register(@Body() register : CreateUserDto) {
  //   const user = await this.userService.register(register);
  //   const token = await this.authService.login(user);
  //   return { token };
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}