import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [ChannelController],
  providers: [ChannelService, YoutubeService],
  exports: [ChannelService],
})
export class ChannelsModule {}
