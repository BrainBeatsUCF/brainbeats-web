import { Database } from '@azure/cosmos';

export async function saveBeat(db: Database, userId: string, beatId: string): Promise<void> {
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

        if (savedBeats === undefined) {
          savedBeats = [];
        }

        if (savedBeats.includes(beatId)) {
          reject('User already has beatId saved');
        } else {
          savedBeats.push(beatId);

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

        if (savedBeats === undefined) {
          savedBeats = [];
        }

        const index = savedBeats.indexOf(beatId);
        if (index > -1) {
          savedBeats.splice(index, 1);

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

export async function getBeat(db: Database, userId: string, beatId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Beats b WHERE b.beatId = @beatId',
      parameters: [
        {
            name: '@beatId',
            value: `${beatId}`
        }
      ]
    };

    const { resources } = await db
      .container('Beats')
      .items.query(querySpec)
      .fetchAll();

    if (resources.length === 0) {
      reject('Beat not found');
    } else {
      for (var queryResult of resources) {
        let { owner, beatId, isPrivate } = queryResult;

        if (owner !== userId && isPrivate) {
          reject('Beat is private and user is not owner');
        } else {
          resolve(queryResult);
        }
      }
    }
  });
}

export async function markBeatAsUnavailable(
  db: Database, userId: string, beatId: string): Promise<void> {
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

        if (savedBeats === undefined) {
          savedBeats = [];
        }

        const index = savedBeats.indexOf(beatId);
        if (index > -1) {
          savedBeats.splice(index, 1, 'UNAVAILABLE');
          console.log(savedBeats);

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