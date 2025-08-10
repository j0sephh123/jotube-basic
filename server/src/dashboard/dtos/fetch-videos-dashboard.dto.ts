import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class fetchVideosDashboardDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  screenshotMin?: number;

  @IsOptional()
  @IsNumber()
  screenshotMax?: number;
}
