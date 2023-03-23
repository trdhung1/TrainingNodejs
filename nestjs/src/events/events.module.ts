import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { MembersModule } from 'src/members/members.module';
import { MembersService } from 'src/members/members.service';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MembersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
