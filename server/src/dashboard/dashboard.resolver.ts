import { Resolver, Query, Args } from '@nestjs/graphql';
import { DashboardService } from './dashboard.service';
import { FetchDashboardInput } from './dtos/fetch-dashboard.input';
import { FetchVideosDashboardInput } from './dtos/fetch-videos-dashboard.input';
import {
  ChannelsDashboardResponse,
  VideosDashboardResponse,
} from './dtos/dashboard.response';
import { ChannelsYearMonthCountsInput } from './dtos/channels-year-month-counts.input';
import { ChannelsYearMonthCountResponse } from './dtos/channels-year-month-counts.response';
import { ViewType } from './types';

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
    @Args('fetchVideosDashboardInput')
    fetchVideosDashboardInput: FetchVideosDashboardInput,
  ): Promise<VideosDashboardResponse> {
    return this.dashboardService.fetchVideosDashboard(
      fetchVideosDashboardInput,
    );
  }

  @Query(() => [ChannelsYearMonthCountResponse])
  async channelsYearMonthCounts(
    @Args('channelsYearMonthCountsInput')
    channelsYearMonthCountsInput: ChannelsYearMonthCountsInput,
  ): Promise<ChannelsYearMonthCountResponse[]> {
    return this.dashboardService.channelsYearMonthCounts(
      channelsYearMonthCountsInput.viewType as ViewType,
    );
  }
}
