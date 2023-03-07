/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto'
import { User, UsersDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { resetPasswordDto } from 'src/dto/resetpass.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UsersDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const user = await new this.userModel(createUserDto);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async resetpassword(resetpassword: resetPasswordDto): Promise<any> {
    const user = await this.userModel.findOne({ username: resetpassword.username });
    const check = await bcrypt.compare(resetpassword.password, user.password);
    if (!user || !check) {
      throw new BadRequestException('wrong username or password');
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(resetpassword.passwordreset, salt);
    user.password = hashPassword;
    return user.save();

  }

  async findAll(): Promise<UsersDocument[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    try {
      const user = await this.userModel.findOne({_id: id });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(updateUserDto.password, salt);
      user.password = hashPassword;
      return user.save();
    }
    catch (err) {
      throw new BadRequestException(err.message, { cause: new Error(), description: 'wrong id ' });
    }
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
  async authentication(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    const check = await bcrypt.compare(password, user.password);
    if (!user || !check) {
      throw new BadRequestException('wrong username or password')
    }

    return user;
  }

}

