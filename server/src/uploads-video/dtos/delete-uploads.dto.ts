import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
} from 'class-validator';

export class deleteUploadsDto {
  @IsNumber()
  channelId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ytVideoIds: string[];
}
