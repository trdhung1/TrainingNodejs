import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { RoleGuard } from './cats/guard/role/role.guard';
import { HttpExceptionFilter } from './cats/http-exception/http-exception.filter';
import { LoggingInterceptor } from './cats/interceptors/logging/logging.interceptor';
import { logger, LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { Member } from './members/entities/member.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entites/project.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import DatabaseLogger from './logger/dbLogger';

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
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
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
