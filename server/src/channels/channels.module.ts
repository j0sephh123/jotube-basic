import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { ArtifactsAggregatorModule } from 'src/artifacts-aggregator/artifacts-aggregator.module';
import { ChannelsResolver } from './channels.resolver';

@Module({
  imports: [ConfigModule, DatabaseModule, ArtifactsAggregatorModule],
  controllers: [ChannelController],
  providers: [ChannelService, YoutubeService, ChannelsResolver],
  exports: [ChannelService],
})
export class ChannelsModule {}
