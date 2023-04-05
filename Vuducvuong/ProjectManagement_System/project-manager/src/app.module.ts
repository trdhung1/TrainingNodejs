/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProjectModule } from './project/project.module';
import { TimeSheetsModule } from './timesheets/timesheets.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.xypbgjl.mongodb.net/projectmanagement_system',
    ),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    TimeSheetsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

