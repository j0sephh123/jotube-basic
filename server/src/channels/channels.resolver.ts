import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { CreateChannelResponse } from './dtos/create-channel.response';
import { CreateChannelInput } from './dtos/create-channel.input';
import { DeleteChannelResponse } from './dtos/delete-channel.response';

@Resolver()
export class ChannelsResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => CreateChannelResponse)
  async createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ): Promise<CreateChannelResponse> {
    return this.channelService.create(createChannelInput);
  }

  @Mutation(() => DeleteChannelResponse)
  async deleteChannel(@Args('id') id: number): Promise<DeleteChannelResponse> {
    return this.channelService.delete(id);
  }
}
