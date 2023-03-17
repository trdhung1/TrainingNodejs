/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto'
import { User, UsersDocument } from '../schema/users.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserLoginDto } from 'src/dto/update-user-onlogin.dto';
import * as xlsx from 'xlsx';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UsersDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const member = await this.userModel.findOne({ userName: createUserDto.userName });
    if (member) {
      throw new BadRequestException("username is exit");
    }
    const user = await new this.userModel(createUserDto);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async createlist(createlistuserdto: CreateUserDto[]) {
    const users: UsersDocument[] = await this.userModel.find().select('userName');
    const nameList = users.map(user => user.userName)
    const newUser = this.userModel.insertMany(createlistuserdto.filter(userItem => !nameList.includes(userItem.userName)).map(item => {
      const salt = bcrypt.genSaltSync();
      const hashPassword = bcrypt.hashSync(item.password, salt);
      item.password = hashPassword;
      return item;

    }));
    return newUser;

  }

  // async register(register: CreateUserDto)
  //  {
  //   const member = await this.userModel.findOne({ userName: register.userName });
  //   if (member) {
  //     throw new BadRequestException("username is exit");
  //   }
  //   const user = await new this.userModel(register);
  //   const salt = await bcrypt.genSalt();
  //   const hashPassword = await bcrypt.hash(user.password, salt);
  //   user.password = hashPassword;
  //   user.roles = Role.User;
  //   const newUser = new this.userModel(user);
  //    return newUser.save();
  //  }

  async importExcel(xlData: CreateUserDto[]) {
    const workbook = xlsx.readFile("C:/Users/PC/Documents/User.xlsx")
    const sheet_name_list = workbook.SheetNames;
    xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const users: UsersDocument[] = await this.userModel.find().select('userName');
    const nameList = users.map(user => user.userName)
    const newUser = this.userModel.insertMany(xlData.filter(userItem => !nameList.includes(userItem.userName)).map(item => {
      const salt = bcrypt.genSaltSync();
      const hashPassword = bcrypt.hashSync(item.password, salt);
      item.password = hashPassword;
      return item;

    }));
    return newUser;

  }

  async updateuserlogin(updateUserLoginDto: UpdateUserLoginDto): Promise<UsersDocument> {
    try {
      const user = await this.userModel.findOne({ userName: updateUserLoginDto.userName });
      const check = await bcrypt.compare(updateUserLoginDto.password, user.password);
      if (!user || !check) {
        throw new HttpException('wrong username or password', HttpStatus.NOT_FOUND);
      }
      if (updateUserLoginDto.newUserName) {
        user.userName = updateUserLoginDto.newUserName
      }
      if (updateUserLoginDto.newPassword) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(updateUserLoginDto.newPassword, salt);
        user.password = hashPassword;
      }
      if (updateUserLoginDto.newFullName) {
        user.fullName = updateUserLoginDto.newFullName;
      }
      if (updateUserLoginDto.newStatus) {
        user.status = updateUserLoginDto.newStatus;
      }
      return user.save();
    }
    catch (err) {
      throw new BadRequestException(err.message, { cause: new Error(), description: 'worng username or password' })
    }

  }

  async findAll() {
    const users: UsersDocument[] = await this.userModel.find();
    return users.map((user: any) => {
      delete user.password;
      return user;
    });
  }

  async GetById(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      return user;
    }
    catch (err) {
      throw new BadRequestException(err.message, { cause: new Error(), description: 'wrong id ' });
    }
  }


  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    try {
      const user = await this.userModel.findOne({ _id: id });
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
  async authentication(userName: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ userName });
    const check = await bcrypt.compare(password, user.password);
    if (!user || !check) {
      throw new BadRequestException('wrong username or password')
    }

    return user;
  }

}

