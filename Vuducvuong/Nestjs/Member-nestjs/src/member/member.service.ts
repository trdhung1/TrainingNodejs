/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createMemberDto : CreateMemberDto,) : Promise<any> {
    const user = await this.memberModel.findOne( {userName :createMemberDto.userName});
    const check = await this.memberModel.findOne( {email : createMemberDto.email });
    if (user || check) {
      return "username or password is exits";
    }
    const member = new this.memberModel(createMemberDto);
    return await member.save();
  }

  // async findRolePm(createMemberDto : CreateMemberDto,):Promise<any> 
  // {
  //   return await this.memberModel.find( {role :createMemberDto.role});
  // }

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
    try {
      await this.memberModel.findByIdAndUpdate(id, updateMemberDto);
      return await this.memberModel.findOne({_id: id})
    }
    catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'id error',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
   
  }

  async remove(id: string) {
    return await this.memberModel.findByIdAndRemove(id);
  }
}
