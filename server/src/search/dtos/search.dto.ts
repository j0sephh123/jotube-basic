import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuickSearchDto {
  @ApiProperty({
    description: 'search',
    example: 'search',
  })
  @IsString()
  search: string;
}

type QuickSearchVideoResult = {
  title: string;
  ytId: string;
  src: string;
  channel: {
    ytId: string;
  };
  type: 'ytVideoId';
};

export type QuickSearchChannelResult = {
  title: string;
  ytId: string;
  src: string;
  type: 'ytChannelId' | 'channelTitle';
};

export type QuickSearchResult =
  | QuickSearchVideoResult
  | QuickSearchChannelResult;
