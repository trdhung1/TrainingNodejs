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
import { Role, Roles } from 'src/auth/decorators/auth.decorator';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Get()
  getAllMembers() {
    return this.memberService.findAll();
  }
  @Roles(Role.ADMIN)
  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }
  @Roles(Role.ADMIN)
  @Put()
  updateMember(@Body() updateMemberDto) {
    return this.memberService.updateMember(updateMemberDto);
  }
  @Roles(Role.ADMIN)
  @Delete()
  deleteMember(@Query('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }
}
