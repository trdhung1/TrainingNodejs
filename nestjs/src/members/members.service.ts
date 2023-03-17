import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordDto } from 'src/auth/auth.controller';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }
  findById(id: number): Promise<Member> {
    return this.memberRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { email } });
  }

  async createMember(createMember) {
    try {
      const { email } = createMember;
      const member = await this.memberRepository.findOne({ where: { email } });
      if (member) {
        throw new HttpException(
          'Email has already existed',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hash = await hashPassword(createMember.password);
      return this.memberRepository.save({ ...createMember, password: hash });
    } catch (error) {
      throw new BadRequestException(error.message, error.status);
    }
  }

  async updateMember(updateMember) {
    try {
      const { id } = updateMember;
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
}
