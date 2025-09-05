import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [ConfigModule, FileModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}
