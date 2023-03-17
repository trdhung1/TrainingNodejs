/* eslint-disable prettier/prettier */
import {
    Controller,Get,Post,Body,Param,Delete,Put, UseInterceptors, UploadedFile,
  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto'
  import { Roles } from '../role/roles.decorator';
  import { Role } from '../role/role.enum';
  import { UpdateUserLoginDto } from 'src/dto/update-user-onlogin.dto';
  import { ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';

  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) { }
  
    @Roles(Role.Hr)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      // console.log(req.user);
      return this.userService.create(createUserDto);
    }

    @Roles(Role.Hr)
    @Post('/listuser')
    @ApiBody({ type: [CreateUserDto] })
    createList(@Body() createlistuserdto: CreateUserDto[]){
      return this.userService.createlist(createlistuserdto);
    }
  
    @Roles(Role.Admin)
    @Get('/')
    GetAllUser() {
      return this.userService.findAll();
    }
  
    @Get('/:id')
    GetUser( @Param('id') id: string) {
      return this.userService.GetById(id);
    }

    @Post('/importexcel')
    @ApiBody({ type: [CreateUserDto] })
    GetImport(xlData:CreateUserDto[]){
      return this.userService.importExcel(xlData)
    }

   @Post('/upload')
   @UseInterceptors(FileInterceptor('file'))
   async upload(@UploadedFile() file: Express.Multer.File){
    const path = "d:\\" + file.originalname
    const fileStream = createWriteStream(path)
    fileStream.write(file.buffer)
    fileStream.end();
  }


    @Put('/update')
    UpdateUserLogin(@Body() updateUserLoginDto: UpdateUserLoginDto)
    {
      return this.userService.updateuserlogin(updateUserLoginDto)
    }

    @Roles(Role.Admin)
    @Put(':id')
    Update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }

  
    @Roles(Role.Admin)
    @Delete(':id')
    Remove(@Param('id') id: string) {
      this.userService.remove(id);
      return "delete successful"
    }
  }
  