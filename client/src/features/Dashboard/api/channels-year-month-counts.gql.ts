import { gql } from "@apollo/client";

export const CHANNELS_YEAR_MONTH_COUNTS = gql`
  query ChannelsYearMonthCounts(
    $channelsYearMonthCountsInput: ChannelsYearMonthCountsInput!
  ) {
    channelsYearMonthCounts(
      channelsYearMonthCountsInput: $channelsYearMonthCountsInput
    ) {
      year
      month
      count
    }
  }
`;
