export interface Tv {
  id: number;
  identifier: string;
  title: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTvDto {
  identifier: string;
  title: string;
  duration?: number;
}

export interface UpdateTvDto {
  identifier?: string;
  title?: string;
  duration?: number;
}
