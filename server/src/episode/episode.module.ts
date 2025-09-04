import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EpisodeService } from './episode.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { EpisodeResolver } from './episode.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [ConfigModule, DatabaseModule, FileModule],
  controllers: [],
  providers: [EpisodeService, EpisodeResolver],
  exports: [EpisodeService],
})
export class EpisodeModule {}
