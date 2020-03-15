import { Database } from '@azure/cosmos';

export async function saveBeat(db: Database, userId: string, beatId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    // Get the corresponding user
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
      // Add that beatId to their savedBeats array
      for (var queryResult of resources) {
        let { id, savedBeats, userId } = queryResult;

        if (savedBeats === undefined) {
          savedBeats = {} as string;
        }

        if (savedBeats.includes(beatId)) {
          reject('User already has beatId saved');
        } else {
          savedBeats.push(beatId);
          queryResult.savedBeats = savedBeats;

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
    }
  });
}

export async function deleteBeat(db: Database, userId: string, beatId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    // Get the corresponding user
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
      // Add that beatId to their savedBeats array
      for (var queryResult of resources) {
        let { id, savedBeats, userId } = queryResult;

        if (savedBeats === undefined) {
          savedBeats = {} as string;
        }

        const index = savedBeats.indexOf(beatId);
        if (index > -1) {
          savedBeats.splice(index, 1);
          queryResult.savedBeats = savedBeats;

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
        } else {
          reject('User does not have beatId saved');
        }
      
      }
    }
  });
}