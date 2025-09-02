import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilePathService } from './file-path.service';
import { FileOperationService } from './file-operation.service';
import { DirectoryService } from './directory.service';
import { OpenDirectoryController } from './open-directory.controller';
import { DeleteFileService } from './delete-file.service';
import { DeleteFileResolver } from './delete-file.resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    FilePathService,
    FileOperationService,
    DirectoryService,
    DeleteFileService,
    DeleteFileResolver,
  ],
  controllers: [OpenDirectoryController],
  exports: [
    FilePathService,
    FileOperationService,
    DirectoryService,
    DeleteFileService,
  ],
})
export class FileModule {}
