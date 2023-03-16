import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { email } = createMember;
    const member = await this.memberRepository.findOne({ where: { email } });
    if (member) {
      return new HttpException(
        'Email has already existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.memberRepository.save(createMember);
  }

  async updateMember(updateMember) {
    const { id } = updateMember;
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const newMember = { ...member, ...updateMember };
    return this.memberRepository.save(newMember);
  }

  deleteMember(id: number) {
    try {
      return this.memberRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
