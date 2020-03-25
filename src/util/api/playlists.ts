import { Database } from '@azure/cosmos';
import uuidv4 from 'uuid/v4';

// TODO: SHIFT AWAY FROM ANY TYPES

// UNUSED, WILL NEED IN THE FUTURE FOR DATA CLEANING?
interface PlaylistFields {
  [index: string]: string | boolean | any;
  playlistId: string;
  name: string;
  image: any;
  ownerId: string;
  beatList: any;
  isPrivate: boolean;
}

export async function createPlaylist(db: Database, userId: string, beatId: string, name: string, image: any, isPrivate: boolean): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Users u WHERE u.userId = @userId',
      parameters: [
        {
            name: '@userId',
            value: `${userId}`
        }
      ]
    };

    const { resources } = await db
      .container('Users')
      .items.query(querySpec)
      .fetchAll();

    if (resources.length === 0) {
      reject('User not found');
    } else {
      for (var queryResult of resources) {
        let { id, savedPlaylists, userId } = queryResult;

        // Make a new playlist
        let playlistId = uuidv4();

        const newPlaylist = {
          playlistId,
          name,
          image,
          ownerId: userId,
          beatList: [beatId],
          isPrivate,
        }

        // Add that playlist to the playlists collection
        db.container('Playlists').items.upsert(newPlaylist);

        // Add that new playlist's playlistId to the user's savedPlaylists
        if (savedPlaylists === undefined) {
          savedPlaylists = [];
        }

        savedPlaylists.push(playlistId);

        await db
          .container('Users')
          .item(id, userId)
          .replace(queryResult)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject('Something went wrong');
          });
      }
    }
  });
}