import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule, DatabaseModule],
  controllers: [ImagesController],
  providers: [],
})
export class ImagesModule {}
