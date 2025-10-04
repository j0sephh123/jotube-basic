import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class AddStoryboardJobDto {
  @ApiProperty({ description: 'Storyboard job payload' })
  @IsObject()
  data: { ytVideoIds: string[] };
}
