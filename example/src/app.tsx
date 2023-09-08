/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-09-08 20:26:19
 * @Description:
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import ThEditor from '../../src/index';
import './app.scss';
const AppCompent = () => {
  return (
    <>
      <div className='main-continer'>
        <ThEditor
          editorName={123}
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
