import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger/dist';
import { Public, Role, Roles } from 'src/auth/decorators/auth.decorator';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Public()
  @Get()
  getAllMembers() {
    return this.memberService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  getMemberById(@Param('id') id: number) {
    return this.memberService.findById(id);
  }

  @ApiBody({ type: [CreateMemberDto] })
  @Roles(Role.ADMIN)
  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }
  @Roles(Role.ADMIN)
  @Put(':id')
  updateMember(@Param('id') id: number, @Body() updateMemberDto) {
    return this.memberService.updateMember(id, updateMemberDto);
  }
  @Roles(Role.ADMIN)
  @Delete()
  deleteMember(@Query('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }

  @Get(':id/projects')
  getProjectsByMemberId(@Param('id') id: number) {
    return this.memberService.getProjectsByMemberId(id);
  }

  @Get(':id/projectManagers')
  getPMByMemberId(@Param('id') id: number) {
    return this.memberService.getPMByMemberId(id);
  }
}
