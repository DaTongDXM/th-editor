/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-22 09:53:19
 * @Description:
 */
import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import ThEditor from '../../src/index';
import './app.scss';
import { theme } from 'antd';
const AppCompent = () => {
  const configProvider = {
    theme: {
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#5d5d5d',
        borderRadius: 4,

        // 派生变量，影响范围小
        colorBgContainer: '#f6ffed',
      },
      algorithm: theme.darkAlgorithm,
    },
  };
  const thEditorRef: any = useRef(null);

  setTimeout(() => {
    if (thEditorRef.current) {
      thEditorRef.current.setAttrbute();
    }
  }, 3000);
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
          editorName={123}
          ref={thEditorRef}
          onClick={(e: any) => {
            console.log(e);
          }}
        ></ThEditor>
      </div>
    </>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<AppCompent />);
