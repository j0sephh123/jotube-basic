import { Resolver, Query, Args } from '@nestjs/graphql';
import { FolderScannerService } from './folder-scanner.service';
import { FolderScannerInput } from './dtos/folder-scanner.input';
import { FolderScannerResponse } from './dtos/folder-scanner.response';

@Resolver()
export class FolderScannerResolver {
  constructor(private readonly folderScannerService: FolderScannerService) {}

  @Query(() => FolderScannerResponse)
  async scanFolder(
    @Args('folderScannerInput') folderScannerInput: FolderScannerInput,
  ): Promise<FolderScannerResponse> {
    return this.folderScannerService.scanFolder(folderScannerInput);
  }
}
