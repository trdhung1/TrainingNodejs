import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Public, Role, Roles } from './decorators/auth.decorator';
import { CreateMemberDto } from 'src/members/dtos/create-member.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { IsEmail, IsString } from 'class-validator';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  newPassword: string;
}
class SignInDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: [SignInDto] })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() createUser: RegisterUserDto) {
    return this.authService.register(createUser);
  }

  //   @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('resetPassword')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Get('public')
  findAll() {
    return 'This is public route';
  }
}
