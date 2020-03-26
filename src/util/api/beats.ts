import { Database } from '@azure/cosmos';

// Adds a Beat to a User's savedBeats array
export async function saveBeat(db: Database, email: string, beatId: string): Promise<void> {
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

        if (savedBeats === undefined || savedBeats == null) {
          savedBeats = [];
        }

        if (savedBeats.includes(beatId)) {
          reject('User already has beatId saved');
        } else {
          savedBeats.push(beatId);
          queryResult.savedBeats = savedBeats;

          await db
            .container('Users')
            .item(id, email)
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

// Removes a Beat from a User's savedBeats array
export async function removeBeatFromSaved(db: Database, email: string, beatId: string): Promise<void> {
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

        if (savedBeats === undefined || savedBeats == null) {
          savedBeats = [];
        }

        const index = savedBeats.indexOf(beatId);
        if (index > -1) {
          savedBeats.splice(index, 1);
          queryResult.savedBeats = savedBeats;

          await db
            .container('Users')
            .item(id, email)
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

// Returns the Beat Object corresponding to the beatId, will need cached userId for verifying ownership
export async function getBeatInformation(db: Database, userId: string, beatId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const querySpec = {
      query: 'SELECT * FROM Beats b WHERE b.id = @id',
      parameters: [
        {
            name: '@id',
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
        let { ownerId, isPrivate } = queryResult;

        if (ownerId !== userId && isPrivate) {
          reject('Beat is private and user is not owner');
        } else {
          resolve(queryResult);
        }
      }
    }
  });
}

// Sets a Beat in a User's savedBeats array to be 'UNAVAILABLE' if that Beat
// ever becomes lost or deleted by others
export async function markBeatAsUnavailable(
  db: Database, email: string, beatId: string): Promise<void> {
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
        let { id, savedBeats, userId } = queryResult;

        if (savedBeats === undefined || savedBeats == null) {
          savedBeats = [];
        }

        const index = savedBeats.indexOf(beatId);
        if (index > -1) {
          savedBeats.splice(index, 1, 'UNAVAILABLE');
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
