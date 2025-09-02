import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DeleteFileService } from './delete-file.service';
import { DeleteFileDto, DeleteFileResponse } from './delete-file.dto';

@Resolver()
export class DeleteFileResolver {
  constructor(private readonly deleteFileService: DeleteFileService) {}

  @Mutation(() => DeleteFileResponse)
  async deleteFileOrDirectory(
    @Args('deleteFileInput') deleteFileInput: DeleteFileDto,
  ): Promise<DeleteFileResponse> {
    return this.deleteFileService.deleteFileOrDirectory(deleteFileInput);
  }
}
