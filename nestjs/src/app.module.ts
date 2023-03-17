import {
    MiddlewareConsumer,
    Module,
    NestModule, ValidationPipe
} from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { RoleGuard } from './cats/guard/role/role.guard';
import { FilesModule } from './files/files.module';
import DatabaseLogger from './logger/dbLogger';
import { logger } from './logger/logger.middleware';
import { Member } from './members/entities/member.entity';
import { MembersModule } from './members/members.module';
import { Project } from './projects/entites/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    MembersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      host: '127.0.0.1',
      port: 5432,
      database: 'vatek',
      synchronize: true,
      logger: new DatabaseLogger(),
      entities: [Member, Project],
    }),
    ProjectsModule,
    AuthModule,
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      //   .apply(LoggerMiddleware)
      .apply(logger)
      //   .exclude({
      //     path: 'cats',
      //     method: RequestMethod.GET,
      //   })
      .forRoutes(CatsController);
  }
}
