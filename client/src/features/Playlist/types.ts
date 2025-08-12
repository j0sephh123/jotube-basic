export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  channels: Channel[];
}

export interface Channel {
  id: number;
  title: string;
  ytId: string;
  src: string;
  videoCount: number;
  createdAt: string;
  updatedAt: string;
  playlistId: number | null;
}

export interface CreatePlaylistDto {
  name: string;
}

export interface UpdatePlaylistDto {
  name?: string;
}

export interface UpdateChannelPlaylistDto {
  playlistId: number | null;
}

export interface PlaylistListResponse {
  playlists: Playlist[];
}
