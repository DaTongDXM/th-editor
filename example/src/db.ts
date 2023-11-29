export default function openDB() {
  const DB_NAME = 'editor';
  let db: IDBDatabase;
  let db_group: IDBObjectStore;
  /*
   *@databaseName 数据仓库的名字
   *@version 数据仓库的版本
   *@databaseName 数据仓库的名字
   */
  let request = window.indexedDB.open(DB_NAME, 1);

  request.onsuccess = (res: any) => {
    console.log('IndexedDB打开成功', res);
    db = res.target.result;
  };

  request.onerror = function (error) {
    console.log('IndexedDB 打开失败', error);
  };

  request.onupgradeneeded = (res: any) => {
    console.log('IndexedDB升级成功', res);
    db = res.target.result;
    db_group = db.createObjectStore('group', { keyPath: 'id' });
    db_group.createIndex('indexName', 'name', { unique: true });
  };
  // @ts-ignore
  return { db, db_group };
}
