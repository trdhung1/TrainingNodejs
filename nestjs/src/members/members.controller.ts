import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}
  @Get()
  getAllMembers() {
    return this.memberService.findAll();
  }
  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }

  @Put()
  updateMember(@Body() updateMemberDto) {
    return this.memberService.updateMember(updateMemberDto);
  }

  @Delete()
  deleteMember(@Query('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }
}
