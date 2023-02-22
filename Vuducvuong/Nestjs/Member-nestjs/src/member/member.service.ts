/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from '../dto/create-member.dto';
import {UpdateMemberDto} from '../dto/update-member.dto'
import { Member, MemberDocument } from '../schema/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModer : Model<MemberDocument>,
  )  {}

  async create(createMemberDto : CreateMemberDto,) : Promise<MemberDocument> {
    const member = new this.memberModer(createMemberDto);
    return await member.save();
  }

  async findAll(): Promise<MemberDocument[]> {
    return await this.memberModer.find().exec();
  }

  async findOne(id: string) {
    return await this.memberModer.findById(id);
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<MemberDocument> {
    await this.memberModer.findByIdAndUpdate(id, updateMemberDto);
    return await this.memberModer.findOne({_id: id})
  }

  async remove(id: string) {
    return await this.memberModer.findByIdAndRemove(id);
  }
}
