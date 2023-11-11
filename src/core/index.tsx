/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-11 18:22:20
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from '../../types';
import Editor from '@/three/Editor';
import mitter from '@/utils/mitt';
import Model from './Model';
import Toolbar from './Toolbar';

const EditorCore: React.FC<EditorCoreProps & { editorRef: any }> = ({ onClick }) => {
  const [loading, setLoading] = useState(true);

  // let editor: Editor;
  let [editor, setRender] = useState<Editor | null>(null);
  useEffect(() => {
    if (!editor) {
      const newRender = new Editor('123', document.getElementById('editor-container')!, mitter);
      setRender(newRender);
      handleRegister();
    }
  }, []); // 依赖数组为空，表示只在组件挂载时执行一次
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  function handleRegister() {
    debugger;
    if (!editor) return;
    editor.mitter.on(mitter.TH_CLICK, (e: any) => {
      onClick(e);
    });
    editor.mitter.onThMsgWaring((msg: string) => {
      message.warning({
        content: msg,
      });
    });
    editor.mitter.onThMsgError((msg: string) => {
      message.error({
        content: msg,
      });
    });
  }

  return (
    <>
      <div className={`mask-container-item left ${loading ? '' : 'hidden'}`}></div>
      <Loading loading={loading}>Loading...</Loading>
      <div className={`mask-container-item right ${loading ? '' : 'hidden'}`}></div>
      {editor && <Toolbar editor={editor} />}
      <Model menuShow={false} />
      <div id='editor-container' className='main-container'></div>
    </>
  );
};
export default EditorCore;
