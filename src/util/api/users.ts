import { Database } from '@azure/cosmos';

export async function getUserProfile(db: Database, email: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Users u WHERE u.email = @email',
      parameters: [
        {
            name: '@email',
            value: `${email}`
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
      resolve(resources[0]);
    }
  });
}

export async function cleanSavedBeats(db: Database, email: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Users u WHERE u.email = @email',
      parameters: [
        {
            name: '@email',
            value: `${email}`
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
        let { id, savedBeats, email } = queryResult;
        let cleanedBeats = [];

        if (savedBeats !== undefined) {
          for (let i = 0; i < savedBeats.length; i++) {
            if (savedBeats[i] !== 'UNAVAILABLE') {
              cleanedBeats.push(savedBeats[i]);
            }
          }
        }

        queryResult.savedBeats = cleanedBeats;

        await db
          .container('Users')
          .item(id, email)
          .replace(queryResult)
          .then(() => {
            resolve();
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    }
  });
}

export async function cleanSavedPlaylists(db: Database, email: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Users u WHERE u.email = @email',
      parameters: [
        {
            name: '@email',
            value: `${email}`
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
        let { id, savedPlaylists, email } = queryResult;
        let cleanedPlaylists = [];

        if (savedPlaylists !== undefined) {
          for (let i = 0; i < savedPlaylists.length; i++) {
            if (savedPlaylists[i] !== 'UNAVAILABLE') {
              cleanedPlaylists.push(savedPlaylists[i]);
            }
          }
        }

        queryResult.savedPlaylists = cleanedPlaylists;

        await db
          .container('Users')
          .item(id, email)
          .replace(queryResult)
          .then(() => {
            resolve();
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    }
  });
}