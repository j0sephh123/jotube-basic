import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TvService } from './tv.service';
import {
  CreateTvResponse,
  CreateTvInput,
  DeleteTvResponse,
  UpdateTvResponse,
  UpdateTvInput,
  DeleteTvInput,
  GetTvInput,
  Tv,
} from './dtos';

@Resolver()
export class TvResolver {
  constructor(private readonly tvService: TvService) {}

  @Mutation(() => CreateTvResponse)
  async createTv(
    @Args('createTvInput') createTvInput: CreateTvInput,
  ): Promise<CreateTvResponse> {
    return this.tvService.create(createTvInput);
  }

  @Mutation(() => DeleteTvResponse)
  async deleteTv(
    @Args('deleteTvInput') deleteTvInput: DeleteTvInput,
  ): Promise<DeleteTvResponse> {
    return this.tvService.delete(deleteTvInput.id);
  }

  @Mutation(() => UpdateTvResponse)
  async updateTv(
    @Args('id') id: number,
    @Args('updateTvInput') updateTvInput: UpdateTvInput,
  ): Promise<UpdateTvResponse> {
    return this.tvService.update(id, updateTvInput);
  }

  @Query(() => [Tv])
  async getAllTvs(): Promise<Tv[]> {
    return this.tvService.findAll();
  }

  @Query(() => Tv, { nullable: true })
  async getTv(@Args('getTvInput') getTvInput: GetTvInput): Promise<Tv | null> {
    return this.tvService.findOne(getTvInput.id);
  }
}
