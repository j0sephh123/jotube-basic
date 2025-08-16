import { Resolver, Query, Args } from '@nestjs/graphql';
import { DashboardService } from './dashboard.service';
import { FetchDashboardInput } from './dtos/fetch-dashboard.input';
import {
  ChannelsDashboardResponse,
  VideosDashboardResponse,
} from './dtos/dashboard.response';

@Resolver()
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => ChannelsDashboardResponse)
  async fetchDashboard(
    @Args('fetchDashboardInput') fetchDashboardInput: FetchDashboardInput,
  ): Promise<ChannelsDashboardResponse> {
    return this.dashboardService.fetchDashboard(fetchDashboardInput);
  }

  @Query(() => VideosDashboardResponse)
  async fetchVideosDashboard(
    @Args('page', { nullable: true }) page?: number,
    @Args('sortOrder', { nullable: true }) sortOrder?: 'asc' | 'desc',
    @Args('screenshotMin', { nullable: true }) screenshotMin?: number,
    @Args('screenshotMax', { nullable: true }) screenshotMax?: number,
  ): Promise<VideosDashboardResponse> {
    return this.dashboardService.fetchVideosDashboard({
      page,
      sortOrder,
      screenshotMin,
      screenshotMax,
    });
  }
}
