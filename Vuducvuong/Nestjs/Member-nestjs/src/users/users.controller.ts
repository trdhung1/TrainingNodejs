/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  

  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto'
  import { resetPasswordDto } from 'src/dto/resetpass.dto';
  import { Roles } from 'src/role/roles.decorator';
  import { Role } from 'src/role/role.enum';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles(Role.Admin)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      // console.log(req.user);
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
   
    @Get(':id')
    findOne(@Body('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  

    @Delete(':id')
    remove(@Param('id') id: string) {
      this.userService.remove(id);
      return "delete successful"
    }
  }
  