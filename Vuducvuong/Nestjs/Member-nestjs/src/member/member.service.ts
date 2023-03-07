/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoledDto } from 'src/dto/role.dto';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto'
import { Member, MemberDocument } from '../schema/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) { }

  async create(createMemberDto: CreateMemberDto,): Promise<any> {
    const user = await this.memberModel.findOne({ userName: createMemberDto.userName });
    const check = await this.memberModel.findOne({ email: createMemberDto.email });
    if (user || check) {
      throw new BadRequestException("username or email is exit");
    }
    const member = new this.memberModel(createMemberDto);
    return await member.save();
  }

  async findRolePm(roleDto: RoledDto): Promise<any> {
    const member = await this.memberModel.findOne({ role: roleDto.role  });
      if (!member ) {
        throw new BadRequestException("wrong role");
      }
    return await this.memberModel.find({ role: roleDto.role });
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
    try {
      await this.memberModel.findByIdAndUpdate(id, updateMemberDto);
      return await this.memberModel.findOne({ _id: id })
    }
    catch (error) {
      throw new BadRequestException(error.message, { cause: new Error(), description: 'wrong id ' });
    }

  }

  async remove(id: string) {
    return await this.memberModel.findByIdAndRemove(id);
  }
}
