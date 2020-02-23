export interface PlaylistDetail {
  playlistId: string,
  playlistName: string,
  playlistImage: string,
  playlistAuthor: string,
  ownerId: string,
  songList: string[],
  isPrivate: boolean,
}

export interface Song {
  songId: string,
  songName: string,
  songAuthor: string,
  duration: number,
  songImage: string,
  userId: string,
  isPrivate: boolean,
}