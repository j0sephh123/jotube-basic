import { IsArray, IsString } from 'class-validator';

export class RemoveJobsDto {
  @IsArray()
  @IsString({ each: true })
  jobIds: string[];
}
