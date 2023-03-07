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
import { MemberService } from './member.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
import { RoledDto } from 'src/dto/role.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get('/FindRole')
  findRolePm(@Body() roleDto: RoledDto) {
    return this.memberService.findRolePm(roleDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.memberService.remove(id);
    return "delete successful"
  }
}
