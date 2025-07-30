import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [ChannelController],
  providers: [ChannelService, YoutubeService, PrismaService],
  exports: [ChannelService],
})
export class ChannelsModule {}
