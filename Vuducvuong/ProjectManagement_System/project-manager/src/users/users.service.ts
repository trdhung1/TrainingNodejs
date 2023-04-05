/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto'
import { User, UsersDocument } from '../schema/users.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserLoginDto } from '../dto/update-user-onlogin.dto';
import * as xlsx from 'xlsx';
import { Role } from '../role/role.enum';
import { MailService } from '../mail/mail.service';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UsersDocument>,
    private mailService: MailService
  ) { }

  hashPasswordSync(password: string) {
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;

  }

  async createlist(createlistuserdto: CreateUserDto[]) {

    const nameList = createlistuserdto.map(user => user.userName)
    const listexist = await this.userModel.find({ "userName": { $in: nameList } });
    const listusernameexist = listexist.map(username => username.userName)
    const userlist = createlistuserdto.filter(userItem => !listusernameexist.includes(userItem.userName))
    const list = userlist.map(user => {
      const hashpassword = this.hashPasswordSync(user.password)
      user.password = hashpassword;
      return user
    })
    const newUser = await this.userModel.insertMany(list);
    if (listexist && newUser.length != 0) {
      return {UserNameExist :listusernameexist + ' already exist', newUser};
    }
    throw new BadRequestException(listusernameexist + ' already exist')
  }

  async register(register: CreateUserDto) {
    const member = await this.userModel.findOne({ userName: register.userName });
    if (member) {
      throw new BadRequestException("username is exit");
    }
    const user =  new this.userModel(register);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    user.roles = Role.User;
    const newUser =  new this.userModel(user);
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.sendUserConfirmation(register , token);
    return newUser.save();
  }

  async importExcel(xlData: CreateUserDto[],file: Express.Multer.File) {
    const workbook = xlsx.read(file.buffer)
    const sheet_name_list = workbook.SheetNames;
    xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],
    {header:['userName','password','fullName','roles','status']});
    xlData.splice(0,1)
    const nameList = xlData.map(user => user.userName)
    const listexist = await this.userModel.find({ "userName": { $in: nameList } });
    const listusernameexist = listexist.map(username => username.userName)
    const userlist = xlData.filter(userItem => !listusernameexist.includes(userItem.userName))
    const list = userlist.map(user => {
      const hashpassword = this.hashPasswordSync(user.password)
      user.password = hashpassword;
      return user
    })
    const newUser = await this.userModel.insertMany(list)
    if (listexist && newUser.length != 0) {
      
       return {UserNameExist :listusernameexist + ' already exist', newUser};
    }
    throw new BadRequestException(listusernameexist + ' already exist');

  }

  async updateuserlogin(updateUserLoginDto: UpdateUserLoginDto): Promise<UsersDocument> {
    try {
      const user = await this.userModel.findOne({ userName: updateUserLoginDto.userName });
      const check = await bcrypt.compare(updateUserLoginDto.password, user.password);
      if (!user || !check) {
        throw new HttpException('wrong username or password', HttpStatus.NOT_FOUND);
      }
      if (updateUserLoginDto.newPassword) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(updateUserLoginDto.newPassword, salt);
        user.password = hashPassword;
      }
      return user.save();
    }
    catch (err) {
      throw new BadRequestException(err.message, { cause: new Error(), description: 'worng username or password' })
    }

  }

  async findAll() {
      const users: UsersDocument[] = await this.userModel.find();
      return users;
    };
  

  async GetById(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }, { __v: 0 });
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

  async remove(id: string): Promise<UsersDocument> {
    try {
      return await this.userModel.findByIdAndRemove(id);
    } catch (err) {
      throw new BadRequestException('wrong id')

    }

  }
  async authentication(userName: string, password: string): Promise<UsersDocument> {
    const user = await this.userModel.findOne({ userName });
    const check = await bcrypt.compare(password, user.password);
    if (!user || !check) {
      throw new BadRequestException('wrong username or password')
    }

    return user;
  }

}

