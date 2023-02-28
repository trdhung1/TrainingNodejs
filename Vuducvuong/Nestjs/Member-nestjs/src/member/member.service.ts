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
    private readonly memberModel : Model<MemberDocument>,
  )  {}

  async create(createMemberDto : CreateMemberDto,) : Promise<MemberDocument> {
    const member = new this.memberModel(createMemberDto);
    return await member.save();
  }

  async findAll(): Promise<MemberDocument[]> {
    return await this.memberModel.find().exec();
  }

  async findOne(id: string) {
    return await this.memberModel.findById(id);
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<MemberDocument> {
    await this.memberModel.findByIdAndUpdate(id, updateMemberDto);
    return await this.memberModel.findOne({_id: id})
  }

  async remove(id: string) {
    return await this.memberModel.findByIdAndRemove(id);
  }
}
