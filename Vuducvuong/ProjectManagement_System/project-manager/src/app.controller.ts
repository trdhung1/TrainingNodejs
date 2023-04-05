/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Post, UseGuards, Body} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './users/public.decorator';
import { UserService } from './users/users.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private authService: AuthService,private userService : UserService ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({type : LoginDto})
  @Post('auth/login')
  async login(@Request() req ) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() register : CreateUserDto) {
    const user = await this.userService.register(register);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}