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

export interface SideBarProps {
  id: string,
  numBeats: number,
  numSamples: number,
  numShares: number,
}

export interface AudioObject {
  imageUrl: string,
  audioUrl: string
  title: string,
  authorName: string,
  id: string,
}

export interface PlaylistObject {
  id: string,
  imageUrl: string,
  // isPrivate: string,
  name: string,
  // email: string,
}

export interface BeatProps {
  setAudioGlobal: any,
  setNumBeatsMethod: any,
}

export interface BeatObject {
  name: string
  // instrumentList: string[],
  id: string,
  imageUrl: string,
}

export interface RecommendedBeatProps {
  setAudioGlobal: any,
}

export interface RecommendedBeatObject {
  name: string
  // instrumentList: string[],
  id: string,
  imageUrl: string,
}

export interface PublicBeatProps {
  setAudioGlobal: any,
}

export interface PublicBeatObject {
  name: string
  // instrumentList: string[],
  id: string,
  imageUrl: string,
  like: boolean,
  // isPlaying: boolean,
  duration: string,
}

export interface PlaylistProps {
  setAudioGlobal: any,
}

export interface PlaylistObject {
  name: string
  id: string,
  imageUrl: string,
}

export interface SampleProps {
  setAudioGlobal: any,
  setNumSamplesMethod: any,
}

export interface SampleObject {
  name: string
  id: string,
  imageUrl: string,
}