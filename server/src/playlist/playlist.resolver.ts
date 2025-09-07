import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import {
  CreatePlaylistInput,
  UpdatePlaylistInput,
  UpdateChannelPlaylistInput,
} from './dtos/playlist.input';
import {
  PlaylistResponse,
  PlaylistDetailsResponse,
  CreatePlaylistResponse,
  UpdatePlaylistResponse,
  DeletePlaylistResponse,
  UpdateChannelPlaylistResponse,
} from './dtos/playlist.response';
import { PlaylistUploadsListUploadResponse } from './dtos/playlist-uploads-list.response';
import { PlaylistUploadsListInput } from './dtos/playlist-uploads-list.input';

@Resolver()
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => CreatePlaylistResponse)
  async createPlaylist(
    @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput,
  ): Promise<CreatePlaylistResponse> {
    const result = await this.playlistService.create(createPlaylistInput);
    return {
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  }

  @Query(() => [PlaylistResponse])
  async playlists(): Promise<PlaylistResponse[]> {
    const results = await this.playlistService.list();
    return results.map((result) => ({
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    }));
  }

  @Query(() => PlaylistDetailsResponse, { nullable: true })
  async playlistDetails(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PlaylistDetailsResponse | null> {
    try {
      const result = await this.playlistService.details(id);
      return result;
    } catch {
      return null;
    }
  }

  @Query(() => [PlaylistUploadsListUploadResponse])
  async playlistUploadsList(
    @Args('playlistUploadsListInput')
    playlistUploadsListInput: PlaylistUploadsListInput,
  ): Promise<PlaylistUploadsListUploadResponse[]> {
    return this.playlistService.playlistUploadsList(playlistUploadsListInput);
  }

  @Mutation(() => UpdatePlaylistResponse)
  async updatePlaylist(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput,
  ): Promise<UpdatePlaylistResponse> {
    const result = await this.playlistService.update(id, updatePlaylistInput);
    return {
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  }

  @Mutation(() => DeletePlaylistResponse)
  async deletePlaylist(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeletePlaylistResponse> {
    return this.playlistService.delete(id);
  }

  @Mutation(() => UpdateChannelPlaylistResponse)
  async updateChannelPlaylist(
    @Args('updateChannelPlaylistInput')
    updateChannelPlaylistInput: UpdateChannelPlaylistInput,
  ): Promise<UpdateChannelPlaylistResponse> {
    const result = await this.playlistService.updateChannelPlaylist(
      updateChannelPlaylistInput,
    );

    // Get video count for the channel
    const videoCount = await this.playlistService[
      'prismaService'
    ].uploadsVideo.count({
      where: { channelId: result.id, artifact: 'VIDEO' },
    });

    return {
      id: result.id,
      title: result.title,
      ytId: result.ytId,
      src: result.src,
      videoCount,
      playlistId: result.playlistId,
    };
  }
}
