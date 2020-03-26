import { CosmosClient, Database } from '@azure/cosmos';
import config from '../../config/databaseConfig.json';
import * as beats from './beats';
import * as users from './users';
import * as playlists from './playlists';

export default class Api {
  private _database: Database;

  constructor() {
    const endpoint = config.endpoint;
    const key = config.key;

    // Create Database
    // EMULATOR NEEDS TO DISABLE SSL VERIFICATION
    // SOURCE: https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    this._database = new CosmosClient({ endpoint, key }).database(config.databaseId);
  }

  // User Functions
  public async getUserProfile(email: string): Promise<any> {
    return users.getUserProfile(this._database, email);
  }

  public async cleanSavedBeats(email: string): Promise<any> {
    return users.cleanSavedBeats(this._database, email);
  }

  public async cleanSavedPlaylists(email: string): Promise<any> {
    return users.cleanSavedPlaylists(this._database, email);
  }

  // Beat Functions
  public async saveBeat(email: string, beatId: string): Promise<void> {
    return beats.saveBeat(this._database, email, beatId);
  }

  public async removeBeatFromSaved(email: string, beatId: string): Promise<void> {
    return beats.removeBeatFromSaved(this._database, email, beatId);
  }

  public async getBeatInformation(userId: string, beatId: string): Promise<void> {
    return beats.getBeatInformation(this._database, userId, beatId);
  }

  public async markBeatAsUnavailable(email: string, beatId: string): Promise<void> {
    return beats.markBeatAsUnavailable(this._database, email, beatId);
  }

  // Playlist Functions
  public async createPlaylist(
    email: string, beatId: string, name: string, image: any, isPrivate: boolean
    ): Promise<void> {
    return playlists.createPlaylist(this._database, email, beatId, name, image, isPrivate)
  }

  // Dummy functions that dont require database connections
  public async demoAddUser(): Promise<void> {
    this._database.container('Users').items.upsert({ 
      id: 'testUserId1',
      firstName: 'testFirstName1',
      lastName: 'testLastName1',
      email: 'testemail@email.com',
      savedBeats: ['testBeatId1', 'testBeatId2', 'testBeatId3'],
      savedPlaylists: ['testPlaylistId1', 'testPlaylistId2', 'testPlaylistId3']
    });
  }

  public async demoAddBeat(): Promise<void> {
    this._database.container('Beats').items.upsert({ 
      id: 'testBeatId1',
      duration: 180,
      name: 'testBeatName1',
      author: 'testUserId100',
      owner: 'testUserId1',
      createdDate: '50000000',
      isPrivate: false,
      modifiedDate: '50000005',
      image: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
      composition: [{
        'sampleId': 'testSampleId1',
        'row': 0,
        'col': 0,
        'duration': 30
      },
      {
        'sampleId': 'testSampleId2',
        'row': 0,
        'col': 5,
        'duration': 15
      },
      {
        'sampleId': 'testSampleId3',
        'row': 1,
        'col': 2,
        'duration': 45
      }],
      instruments: ['mayonaise', 'harpsichord', 'ocarina']
    });
  }

  async demoGetSong(songId: string) {
    if (songId === 'songId1') {
      return {
        songId: 'songId1',
        duration: 111,
        songName: 'Song Name A',
        songAuthor: 'Song Author A',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else if (songId === 'songId2') {
      return {
        songId: 'songId2',
        duration: 111,
        songName: 'Song Name B',
        songAuthor: 'Song Author B',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else if (songId === 'songId3') {
      return {
        songId: 'songId3',
        duration: 111,
        songName: 'Song Name C',
        songAuthor: 'Song Author C',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else if (songId === 'songId4') {
      return {
        songId: 'songId4',
        duration: 111,
        songName: 'Song Name D',
        songAuthor: 'Song Author D',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else if (songId === 'songId5'){
      return {
        songId: 'songId5',
        duration: 111,
        songName: 'Song Name E',
        songAuthor: 'Song Author E',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else if (songId === 'songId6') {
      return {
        songId: 'songId6',
        duration: 111,
        songName: 'Song Name F',
        songAuthor: 'Song Author F',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
      }
    } else {
      return {
        songId: 'songId6',
        duration: 111,
        songName: 'Song Name G',
        songAuthor: 'Song Author G',
        songImage: 'https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/aac4f9b5127946ec8cc85c718d4261d5',
        userId: 'testyMcTestId',
        isPrivate: false
     }
    }
  }

  async demoGetPlaylist(playlistId: string) {
    return {
      playlistId,
      playlistName: 'nameyMcNameFace',
      playlistAuthor: 'playlist Author Name',
      playlistImage: 'data:image/jpeg;base64,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',
      ownerId: 'testyMcTestId',
      songList: [
        'songId1', 'songId2', 'songId3', 'songId4', 'songId5', 'songId6', 'songId7'
      ],
      isPrivate: false
    }
  }

  async getSavedSongs(userId: string, authCode: string) {
    return [
      "songId1",
      "songId2",
      "songId3",
      "songId4",
      "songId5"
    ];
  }

  async getSavedPlaylists(userId: string, authCode: string) {
    return [
      "playlistId1",
      "playlistId2",
      "playlistId3",
      "playlistId4",
      "playlistId5"
    ];
  }
}
