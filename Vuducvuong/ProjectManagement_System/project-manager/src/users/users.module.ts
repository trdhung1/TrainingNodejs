/* eslint-disable prettier/prettier */
import {  Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User, UsersSchema } from '../schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UsersSchema,
      },
    ]),MailModule

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
