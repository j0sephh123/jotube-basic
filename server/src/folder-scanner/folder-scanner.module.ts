import { Module } from '@nestjs/common';
import { FolderScannerService } from './folder-scanner.service';
import { FolderScannerResolver } from './folder-scanner.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [FolderScannerService, FolderScannerResolver],
  exports: [FolderScannerService],
})
export class FolderScannerModule {}
