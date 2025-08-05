import { IsNumber, IsString, IsIn, IsOptional, IsArray } from 'class-validator';
import { ViewType } from '../types';

export class fetchDashboardDto {
  @IsNumber()
  page: number;

  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  min?: number;

  @IsOptional()
  @IsNumber()
  max?: number;

  @IsOptional()
  @IsNumber()
  defaultMin?: number;

  @IsOptional()
  @IsNumber()
  defaultMax?: number;

  @IsOptional()
  @IsString()
  @IsIn(['saved', 'processed', 'no-uploads', 'no-screenshots', 'thumbnails'])
  viewType?: ViewType;
}
