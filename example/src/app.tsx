/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-17 12:33:22
 * @Description:
 */
import React, { useRef, useEffect } from 'react';

import { createRoot } from 'react-dom/client';
import ThEditor from '../../src/index';
import { useImmer } from 'use-immer';
// @ts-ignore
// import ThEditor from '../../dist/index';

import './app.scss';
const DB_NAME = 'editor';
let db: IDBDatabase;
let db_group: IDBObjectStore;
const AppCompent = () => {
  const configProvider = {
    theme: {
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#5d5d5d',
        borderRadius: 4,
      },
    },
  };
  const [modelOption, updateModelOption] = useImmer({
    allowEdit: true,
    groupNameLength: 10,
    layout: 'card',
    data: [],
  });
  const thEditorRef: any = useRef(null);

  setTimeout(() => {
    if (thEditorRef.current) {
      thEditorRef.current.setAttrbute();
    }
  }, 3000);

  useEffect(() => {
    let request = window.indexedDB.open(DB_NAME, 1);
    request.onsuccess = (res: any) => {
      console.log('IndexedDB打开成功', res);
      db = res.target.result;
      const request = db.transaction('group', 'readwrite').objectStore('group').getAll();
      request.onsuccess = (e: any) => {
        if (e.target.result) {
          updateModelOption((draft: any) => {
            draft.data = e.target.result;
          });
          console.log('查询group：', e.target.result);
        }
      };
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
  }, []);
  const handleAddGroup = (name: string) => {
    console.log(name);
    const request = db
      .transaction('group', 'readwrite')
      .objectStore('group')
      .add({ id: new Date().getTime(), name: name });
    request.onsuccess = (e: any) => {
      updateModelOption((draft: any) => {
        draft.data.push({ id: new Date().getTime(), name: name });
      });
    };
  };
  return (
    <>
      <div
        className='main-container'
        onClick={() => {
          console.log('点击contier');
        }}
      >
        <ThEditor
          configProvider={configProvider}
          id={123}
          ref={thEditorRef}
          modelOption={modelOption}
          onClick={(e: Event) => {
            console.log(e);
          }}
          onGroupAdd={handleAddGroup}
          onDelete={(e: any) => {}}
          onAdd={(e: any) => {}}
        ></ThEditor>
      </div>
    </>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<AppCompent />);
if (module.hot) {
  module.hot.accept();
}
