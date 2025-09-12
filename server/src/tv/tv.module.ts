import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TvService } from './tv.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { TvResolver } from './tv.resolver';
import { FileModule } from 'src/file/file.module';
import { FolderScannerModule } from 'src/folder-scanner/folder-scanner.module';
import { EpisodeModule } from 'src/episode/episode.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    FileModule,
    FolderScannerModule,
    EpisodeModule,
  ],
  controllers: [],
  providers: [TvService, TvResolver],
  exports: [TvService],
})
export class TvModule {}
