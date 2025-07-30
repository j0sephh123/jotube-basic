import { IsObject, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type YtChannelId = string;
type YtVideoId = string;

class YtVideoIdsArray {
  @ApiProperty({ type: [String], description: 'Array of YouTube video IDs' })
  @IsArray()
  @IsString({ each: true })
  videoIds: YtVideoId[];
}

export class AddVideosDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'array', items: { type: 'string' } },
    description: 'Map of YouTube channel IDs to arrays of video IDs',
    example: { ytChannelId: ['ytVideoId1', 'ytVideoId2'] },
  })
  @IsObject()
  @ValidateNested()
  @Type(() => YtVideoIdsArray)
  ytVideos: Record<YtChannelId, YtVideoId[]>;
}
