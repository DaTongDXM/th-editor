/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-22 15:58:31
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { message } from 'antd';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from 'ThEditor';
import Editor from '@/three/Editor';
import mitter from '@/utils/mitt';
import Model from './Model';
import Toolbar from './Toolbar';
import BottomBar from './Toolbar/bottom';
import Attribute from './Attribute';

const EditorCore = React.forwardRef(({ onClick }: EditorCoreProps, ref: any) => {
  const [loading, setLoading] = useState(true);

  // let editor: Editor;
  let [editor, setEditor] = useState<Editor | null>(null);
  let [keyCode, setKeyCode] = useState(81);
  useEffect(() => {
    if (!editor) {
      const newEditor = new Editor('123', document.getElementById('editor-container')!, mitter);
      setEditor(newEditor);
      handleRegister(newEditor);
    }
  }, []); // 依赖数组为空，表示只在组件挂载时执行一次
  useImperativeHandle(ref, () => ({
    setAttrbute() {
      console.log(123);
    },
  }));
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  function handleRegister(newEditor: Editor) {
    if (!newEditor) return;
    newEditor.mitter.on(mitter.TH_CLICK, (e: any) => {
      onClick(e);
    });
    newEditor.mitter.onThMsgWaring((msg: string) => {
      message.warning({
        content: msg,
      });
    });
    newEditor.mitter.onThMsgError((msg: string) => {
      message.error({
        content: msg,
      });
    });
  }

  window.addEventListener('keydown', (event) => {
    console.log(event.keyCode);
    if (!editor) return;
    setKeyCode(event.keyCode);
    switch (event.keyCode) {
      case 81: // Q
        editor.dragabel = true;
        editor.controls.dispose();
        break;
      case 87: // W
        editor.controls.transformControl.setMode('translate');
        editor.dragabel = false;
        break;
      case 69: // E
        editor.controls.transformControl.setMode('rotate');
        editor.dragabel = false;
        break;
      case 82: // R
        editor.controls.transformControl.setMode('scale');
        editor.dragabel = false;
        break;
      default:
        break;
    }
  });
  return (
    <div id='th-editor' className='th-editor'>
      <div className={`mask-container-item left ${loading ? '' : 'hidden'}`}></div>
      <Loading loading={loading}>Loading...</Loading>
      <div className={`mask-container-item right ${loading ? '' : 'hidden'}`}></div>
      {editor && <Toolbar editor={editor} keyCode={keyCode} />}
      <Model menuShow={false} />
      <div id='editor-container' className='main-container'></div>
      <BottomBar />
      <Attribute />
    </div>
  );
});
export default EditorCore;
