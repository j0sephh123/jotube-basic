import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileModule } from '../file/file.module';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [ConfigModule, FileModule, DatabaseModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}
