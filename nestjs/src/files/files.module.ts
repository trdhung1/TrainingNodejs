import { Module } from '@nestjs/common';
import { MembersModule } from 'src/members/members.module';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  imports: [MembersModule],
})
export class FilesModule {}
