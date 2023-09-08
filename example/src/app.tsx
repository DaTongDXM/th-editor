/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-08-25 09:35:00
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
        <ThEditor editorName={123}></ThEditor>
      </div>
    </>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<AppCompent />);
