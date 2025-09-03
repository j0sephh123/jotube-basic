import { Resolver, Query, Args } from '@nestjs/graphql';
import { StoryboardService } from './storyboard.service';
import { UploadWithStoryboardResponse } from './dtos/upload-with-storyboard.response';
import { StoryboardQueryInput } from './dtos/storyboard-query.input';

@Resolver()
export class StoryboardResolver {
  constructor(private readonly storyboardService: StoryboardService) {}

  @Query(() => [UploadWithStoryboardResponse])
  async uploadsWithStoryboards(
    @Args('input') input: StoryboardQueryInput,
  ): Promise<UploadWithStoryboardResponse[]> {
    return this.storyboardService.getUploadsWithStoryboards(input);
  }
}
