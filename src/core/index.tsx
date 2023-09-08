/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-09-08 20:28:26
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState } from 'react';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from '../../types';
import Render from '@/three/render';
interface PropsEditorCore {
  onClick: () => {};
}
const EditorCore: React.FC<EditorCoreProps & { editorRef: any }> = ({
  onClick,
}: PropsEditorCore | any) => {
  const [loading, setLoading] = useState(true);

  let render: Render;
  useEffect(() => {
    if (!render) {
      render = new Render('123', document.getElementById('render-continer')!);
      handleRegister();
    }
  }, []); // 依赖数组为空，表示只在组件挂载时执行一次
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  function handleRegister() {
    render.emitter.on('click', (e) => {
      onClick && onClick(e);
    });
  }

  return (
    <>
      <div className={`mask-continer-item left ${loading ? '' : 'hidden'}`}></div>
      <Loading loading={loading}>Loading...</Loading>
      <div className={`mask-continer-item right ${loading ? '' : 'hidden'}`}></div>

      <div id='render-continer' className='main-continer'></div>
    </>
  );
};
export default EditorCore;
