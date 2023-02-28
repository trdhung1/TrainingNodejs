/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards
  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto'
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { resetPasswordDto } from 'src/dto/resetpass.dto';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
    
    @Put()
    resetpassword(@Body() resetpassword : resetPasswordDto) {
      return this.userService.resetpassword(resetpassword);
    }
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Body('id') id: string) {
      return this.userService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      this.userService.remove(id);
      return "delete successful"
    }
  }
  