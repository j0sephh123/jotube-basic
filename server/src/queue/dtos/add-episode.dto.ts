import { IsNumber } from 'class-validator';

export class AddEpisodeJobDto {
  @IsNumber()
  episodeId: number;
}
