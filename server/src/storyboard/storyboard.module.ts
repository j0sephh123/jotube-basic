import { Module } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';
import { StoryboardController } from './storyboard.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StoryboardController],
  providers: [StoryboardService],
  exports: [StoryboardService],
})
export class StoryboardModule {}
