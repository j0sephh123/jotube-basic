import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilePathService } from './file-path.service';
import { FileOperationService } from './file-operation.service';
import { DirectoryService } from './directory.service';
import { OpenDirectoryController } from './open-directory.controller';

@Module({
  imports: [ConfigModule],
  providers: [FilePathService, FileOperationService, DirectoryService],
  controllers: [OpenDirectoryController],
  exports: [FilePathService, FileOperationService, DirectoryService],
})
export class FileModule {}
