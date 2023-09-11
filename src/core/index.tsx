/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-09-11 10:24:54
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState } from 'react';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from '../../types';
import Render from '@/three/render';

const EditorCore: React.FC<EditorCoreProps & { editorRef: any }> = ({
  onClick,
}: EditorCoreProps) => {
  const [loading, setLoading] = useState(true);

  let render: Render;
  useEffect(() => {
    if (!render) {
      render = new Render('123', document.getElementById('render-container')!);
      handleRegister();
    }
  }, []); // 依赖数组为空，表示只在组件挂载时执行一次
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  function handleRegister() {
    render.emitter.on('click', (e) => {
      onClick(e);
    });
  }

  return (
    <>
      <div className={`mask-container-item left ${loading ? '' : 'hidden'}`}></div>
      <Loading loading={loading}>Loading...</Loading>
      <div className={`mask-container-item right ${loading ? '' : 'hidden'}`}></div>

      <div id='render-container' className='main-container'></div>
    </>
  );
};
export default EditorCore;
