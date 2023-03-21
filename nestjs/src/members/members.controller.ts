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
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Public, Role, Roles } from 'src/auth/decorators/auth.decorator';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { MembersService } from './members.service';

export class ProjectAttribute {
  @ApiPropertyOptional()
  openDate: string;
  @ApiPropertyOptional()
  endDate: string;
}

export class MemberAttribute {
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  status: string;
  @ApiPropertyOptional()
  userName: string;
  @ApiPropertyOptional()
  fullName: string;
  @ApiPropertyOptional()
  role: string;
}
@ApiBearerAuth()
@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @ApiOperation({ summary: 'get all members' })
  @ApiOkResponse({ description: 'OK response' })
  @Public()
  @Get()
  getAllMembers(@Query() memberAttribute: MemberAttribute) {
    return this.memberService.findAll(memberAttribute);
  }

  @ApiOperation({ summary: 'get one member by id' })
  @Roles(Role.ADMIN)
  @Get(':id')
  getMemberById(@Param('id') id: number) {
    return this.memberService.findById(id);
  }

  //   @ApiBody({ type: [CreateMemberDto] })
  @ApiOperation({ summary: 'create new member' })
  @Roles(Role.ADMIN)
  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }

  @ApiOperation({ summary: 'update member' })
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateMember(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.updateMember(id, updateMemberDto);
  }

  @ApiOperation({ summary: 'delete member' })
  @Roles(Role.ADMIN)
  @Delete()
  deleteMember(@Query('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }

  @ApiOperation({ summary: 'get all project of member' })
  @Get(':id/projects')
  getProjectsByMemberId(
    @Param('id') id: number,
    @Query() attribute: ProjectAttribute,
  ) {
    return this.memberService.getProjectsByMemberId(id, attribute);
  }

  @ApiOperation({ summary: 'get all PM of member' })
  @Get(':id/projectManagers')
  getPMByMemberId(@Param('id') id: number) {
    return this.memberService.getPMByMemberId(id);
  }
}
