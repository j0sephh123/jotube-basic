import { Resolver, Mutation, Args, Query, Float } from '@nestjs/graphql';
import { EpisodeService } from './episode.service';
import {
  CreateEpisodeResponse,
  CreateEpisodeInput,
  DeleteEpisodeResponse,
  UpdateEpisodeResponse,
  UpdateEpisodeInput,
  DeleteEpisodeInput,
  GetEpisodeInput,
  Episode,
} from './dtos';

@Resolver()
export class EpisodeResolver {
  constructor(private readonly episodeService: EpisodeService) {}

  @Mutation(() => CreateEpisodeResponse)
  async createEpisode(
    @Args('createEpisodeInput') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeResponse> {
    return this.episodeService.create(createEpisodeInput);
  }

  @Mutation(() => DeleteEpisodeResponse)
  async deleteEpisode(
    @Args('deleteEpisodeInput') deleteEpisodeInput: DeleteEpisodeInput,
  ): Promise<DeleteEpisodeResponse> {
    return this.episodeService.delete(deleteEpisodeInput.id);
  }

  @Mutation(() => UpdateEpisodeResponse)
  async updateEpisode(
    @Args('id', { type: () => Float }) id: number,
    @Args('updateEpisodeInput') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<UpdateEpisodeResponse> {
    return this.episodeService.update(id, updateEpisodeInput);
  }

  @Query(() => [Episode])
  async getAllEpisodes(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Query(() => [Episode])
  async getEpisodesByTvId(
    @Args('tvId', { type: () => Float }) tvId: number,
  ): Promise<Episode[]> {
    return this.episodeService.findByTvId(tvId);
  }

  @Query(() => Episode, { nullable: true })
  async getEpisode(
    @Args('getEpisodeInput') getEpisodeInput: GetEpisodeInput,
  ): Promise<Episode | null> {
    return this.episodeService.findOne(getEpisodeInput.id);
  }
}
