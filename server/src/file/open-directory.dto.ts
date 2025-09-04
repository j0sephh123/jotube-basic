import { IsString, IsOptional } from 'class-validator';

export class OpenDirectoryDto {
  @IsString()
  collection: string;

  @IsOptional()
  @IsString()
  media?: string;
}
