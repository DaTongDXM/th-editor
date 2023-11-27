/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-27 19:46:25
 * @Description:
 */
import React, { useRef, useState } from 'react';
import { db, db_group } from './db';
import { createRoot } from 'react-dom/client';
import ThEditor from '../../src/index';

// @ts-ignore
// import ThEditor from '../../dist/index';

import './app.scss';
import { theme } from 'antd';
const AppCompent = () => {
  const configProvider = {
    theme: {
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#5d5d5d',
        borderRadius: 4,
      },
      algorithm: theme.darkAlgorithm,
    },
  };
  const [modelOption, setModelOption] = useState({
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
  const handleAddGroup = (name: string) => {
    console.log(name);
    const request = db
      .transaction('group', 'readwrite')
      .objectStore('group')
      .add({ id: new Date().getTime(), name: name });
    request.onsuccess = (e: any) => {
      const request = db.transaction('group', 'readwrite').objectStore('group').getAll();
      request.onsuccess = (e: any) => {
        if (e.target.result) {
          setModelOption({ ...modelOption, ...{ data: e.target.result } });
          console.log('查询group：', e.target.result);
        }
      };
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
          onAddGroup={handleAddGroup}
        ></ThEditor>
      </div>
    </>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<AppCompent />);
