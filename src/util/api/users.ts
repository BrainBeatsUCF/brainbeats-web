import { Database } from '@azure/cosmos';

export async function getUserProfile(db: Database, userId: string): Promise<void> {
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
      resolve(resources[0]);
    }
  });
}

export async function cleanSavedBeats(db: Database, userId: string): Promise<void> {
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
        let { id, savedBeats, userId } = queryResult;
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