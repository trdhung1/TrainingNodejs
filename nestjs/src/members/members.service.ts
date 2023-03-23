import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ResetPasswordDto } from 'src/auth/auth.controller';
import { ResetPasswordDto } from '../auth/auth.controller';
// import {
//   comparePassword,
//   hashPassword,
//   hashSyncPassword,
// } from 'src/utils/bcrypt';
import {
  comparePassword,
  hashPassword,
  hashSyncPassword,
} from '../utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberAttribute, ProjectAttribute } from './members.controller';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  findAll(memberAttribute?: MemberAttribute) {
    return this.memberRepository.find({
      where: {
        email: memberAttribute?.email,
        userName: memberAttribute?.userName,
        fullName: memberAttribute?.fullName,
        role: memberAttribute?.role,
        status: memberAttribute?.status,
      },
    });
  }
  findById(id: number): Promise<Member> {
    return this.memberRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<Member> {
    return this.memberRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'password',
        'role',
        'position',
      ],
    });
  }

  async createMember(createMember: CreateMemberDto) {
    try {
      const { email } = createMember;
      const member = await this.memberRepository.findOne({ where: { email } });
      if (member) {
        throw new HttpException(
          'The email has already existed',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hash = await hashPassword(createMember.password);
      return this.memberRepository.save({ ...createMember, password: hash });
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  async updateMember(id: number, updateMember: UpdateMemberDto) {
    try {
      const member = await this.memberRepository.findOne({ where: { id } });
      if (!member) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      const newMember = { ...member, ...updateMember };
      return this.memberRepository.save(newMember);
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  async updateMemberByEmail(updateMember: UpdateMemberDto) {
    try {
      const { email } = updateMember;
      const member = await this.memberRepository.findOne({ where: { email } });
      if (!member) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      const newMember = { ...member, ...updateMember };
      return this.memberRepository.save(newMember);
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  async createManyMember(memberList) {
    try {
      const members = await this.memberRepository.find();
      const emailList = members.map((member) => member.email);

      const newData = memberList
        .filter((user: any) => !emailList.includes(user.email))
        .map((user: any) => {
          const { password } = user;
          const hashPassword = hashSyncPassword(`${password}`);
          return { ...user, password: hashPassword };
        });
      return this.memberRepository.save(newData);
      //   return newData;
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  async updatePasswordByEmail(updateMember: ResetPasswordDto) {
    try {
      const { email, password } = updateMember;
      const member = await this.memberRepository.findOne({ where: { email } });
      if (!member) {
        throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
      }
      const isMatch = await comparePassword(password, member.password);
      if (!isMatch) {
        throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
      }
      const newPassword = await hashPassword(updateMember.newPassword);
      const newMember = { ...member, password: newPassword };
      return this.memberRepository.save(newMember);
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  deleteMember(id: number) {
    try {
      return this.memberRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  getProjectsByMemberId(id: number, attribute?: ProjectAttribute) {
    return this.memberRepository.findOne({
      relations: {
        projects: true,
      },
      where: {
        id: id,
        projects: {
          openDate: attribute?.openDate,
          endDate: attribute?.endDate,
        },
      },
    });
  }

  getPMByMemberId(id: number) {
    return this.memberRepository.findOne({
      relations: {
        projects: {
          projectManager: true,
        },
      },
      where: {
        id,
      },
    });
  }
}
