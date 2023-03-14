/* eslint-disable prettier/prettier */
import {
    Controller,Get,Post,Body,Param,Delete,Put,
  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto'
  import { Roles } from '../role/roles.decorator';
  import { Role } from '../role/role.enum';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) { }
  
    @Roles(Role.Hr)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      // console.log(req.user);
      return this.userService.create(createUserDto);
    }
  
    @Get('/')
    GetAllUser() {
      return this.userService.findAll();
    }
  
    @Get('/:id')
    GetUser( @Param('id') id: string) {
      return this.userService.GetById(id);
    }
  
    @Put(':id')
    Update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  
  
    @Delete(':id')
    Remove(@Param('id') id: string) {
      this.userService.remove(id);
      return "delete successful"
    }
  }
  