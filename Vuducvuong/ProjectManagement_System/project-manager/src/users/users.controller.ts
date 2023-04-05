/* eslint-disable prettier/prettier */
import {
    Controller,Get,Post,Body,Param,Delete,Put, UseInterceptors, UploadedFile, BadRequestException, 
  } from '@nestjs/common';
  import { UserService } from './users.service';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/update-user.dto'
  import { Roles } from '../role/roles.decorator';
  import { Role } from '../role/role.enum';
  import { UpdateUserLoginDto } from '../dto/update-user-onlogin.dto';
  import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { createWriteStream } from 'fs';


  @ApiTags('users')
  @ApiBearerAuth()
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) { }


    @Roles(Role.Hr,Role.Admin)
    @Post('/listuser')
    @ApiBody({ type: [CreateUserDto] })
    async createList(@Body() createlistuserdto: CreateUserDto[]){
      try {
        return await this.userService.createlist(createlistuserdto);
      } catch (error) {
        throw new BadRequestException(error.message)
      }
    }
  
    @ApiOperation({summary: ' Get All User'})
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
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({ type: [CreateUserDto] })
    GetImport(@UploadedFile() file: Express.Multer.File,xlData:CreateUserDto[]){
      try{
        const path = "D:/TrainingNodejs/TrainingNodejs/Vuducvuong/ProjectManagement_System/project-manager/src/fileupload/" + file.originalname
        const fileStream = createWriteStream(path)
        fileStream.write(file.buffer)
        fileStream.end();
        return this.userService.importExcel(xlData,file)
      }
      catch(err)
      {
        throw new BadRequestException(err);
      }
     
    }

  //  @Post('/upload')
  //  @UseInterceptors(FileInterceptor('file'))
  //  async upload(@UploadedFile() file: Express.Multer.File){
  //   try{
  //     const path = "D:/TrainingNodejs/TrainingNodejs/Vuducvuong/ProjectManagement_System/project-manager/src/fileupload/" + file.originalname
  //     const fileStream = createWriteStream(path)
  //     fileStream.write(file.buffer)
  //     fileStream.end();
  //     return path;
  //   }
  //   catch(err)
  //   {
  //     throw new BadRequestException(err)
  //   }
  // }


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
      try{
        this.userService.remove(id);
        return "delete successful"
      }
      catch(err){
        throw new BadRequestException(err);
      }
      
    }
  }
  