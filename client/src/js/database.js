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
export const putDb = async (content) => {
  console.log("putting data into DB");

  const jateDB=await openDB("jate",1);
  let tx = await jateDB.transaction(["jate"], "readwrite")
  let store = tx.objectStore("jate");
  const request=store.put({id:1,value:content});
  const result=await request;
  console.log("data save to the database",result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from database");
  const jateDB=await openDB("jate",1);
  let tx = await jateDB.transaction(['jate'],"readonly");
  let store =tx.objectStore("jate");
  const request=store.get(1);
  const results = await request;
  results
     ?  console.log("data retrieved from the database", results)
     :  console.log('data not found in the database');

  return results
};

initdb();
