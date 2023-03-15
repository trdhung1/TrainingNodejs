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

  createMember(createMember) {
    return this.memberRepository.save(createMember);
  }

  async updateMember(updateMember) {
    const { id } = updateMember;
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      return new NotFoundException();
    }
    const newMember = { ...member, ...updateMember };
    return this.memberRepository.save(newMember);
  }

  deleteMember(id: number) {
    return this.memberRepository.delete({ id: id });
  }
}
