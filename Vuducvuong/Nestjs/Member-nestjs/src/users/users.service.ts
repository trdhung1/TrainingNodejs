/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import {UpdateUserDto} from '../dto/update-user.dto'
import { User, UsersDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { resetPasswordDto } from 'src/dto/resetpass.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel : Model<UsersDocument>,
  )  {}

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const user = await new this.userModel(createUserDto);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async resetpassword(resetpassword : resetPasswordDto ): Promise<any> {
    try {
      const user = await this.userModel.findOne( {username : resetpassword.username });
      const check = await bcrypt.compare(resetpassword.password, user.password);
      if (!user || !check) {
        return false;
      } 
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(resetpassword.passwordreset, salt);
      user.password = hashPassword;
      return user.save();
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'syntax error username or password',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
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
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return await this.userModel.findOne({_id: id})
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
  async authentication(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({username});
    const check = await bcrypt.compare(password, user.password);
    if (!user || !check) {
      return false;
    }

    return user;
  }
  
}
  
