import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { CreateChannelResponse } from './dtos/create-channel.response';
import { CreateChannelInput } from './dtos/create-channel.input';

@Resolver()
export class ChannelsResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => CreateChannelResponse)
  async createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ): Promise<CreateChannelResponse> {
    return this.channelService.create(createChannelInput);
  }
}
