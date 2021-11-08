import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
// ** export a function to post to the database **
export const putDb = async (content, id) => {
  console.log('Post to the database');

  // ** create a connection to the database and version we want to use **
  const jateDb = await openDB('jate', 1);

  // ** create a new transaction and specify the db and privileges **
  const tx = jateDb.transaction('jate', 'readwrite');

  // ** open up desired object store **
  const store = tx.objectStore('jate');

  // ** use .add() method on the store and pass in the content **
  const request = store.put({content: content, id: id });

  // ** get confirmation of the request **
  const result = await request;
  console.log('🚀 - Data saved to database!!', result);
};


// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
// ** export a function to get all content from database **
// TESTING sandbox
export const getDb = async () => {
  console.log('GET from the database');

  // ** create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);

  // ** create a new transaction and specify db and privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // ** open up the desired object store
  const store = tx.objectStore('jate');

  // ** use .getAll() method to get all data in the db
  const request = store.getAll();

  // ** get confirmation of request **
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
