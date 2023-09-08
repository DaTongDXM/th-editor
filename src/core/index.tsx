/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-08-29 15:41:05
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState } from 'react';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from '../../types';
import Render from '@/three/render';
const EditorCore: React.FC<EditorCoreProps & { editorRef: any }> = (props: any) => {
  // const { id, editorRef } = props;
  const [loading, setLoading] = useState(true);

  let render: any;
  useEffect(() => {
    if (!render) {
      render = new Render('123', document.getElementById('render-continer')!);
    }
  }, [render]);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
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
