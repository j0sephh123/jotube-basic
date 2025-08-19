import { Module } from '@nestjs/common';
import { ImageNavigatorController } from './image-navigator.controller';
import { ImageNavigatorService } from './image-navigator.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImageNavigatorController],
  providers: [ImageNavigatorService],
  exports: [ImageNavigatorService],
})
export class ImageNavigatorModule {}
