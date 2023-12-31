/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2024-01-05 15:06:39
 * @Description:The editor container contains the canvas , toolbar and attribute
 */
import React, { useEffect, useState, useImperativeHandle, useRef, useContext } from 'react';
import { message } from 'antd';
import './index.scss';
import Loading from '@/components/Loading';
import { EditorCoreProps } from 'ThEditor';
import { Object3D } from 'three';
import Editor from '@/three/Editor';
import mitter from '@/utils/mitt';
import Model from './Model';
import Toolbar from './Toolbar';
import BottomBar from './Toolbar/bottom';
import Setting from './Setting';
import _ from 'lodash';
import { EditorContext } from '@/context/editorContext';
const EditorCore = React.forwardRef(
  (
    {
      id = '',
      name = '',
      modelOption,
      onClick,
      onDelete,
      onAdd,
      onChange,
      onGroupAdd,
    }: EditorCoreProps,
    ref: any,
  ) => {
    const [loading, setLoading] = useState(true);

    // let editor: Editor;
    let [editor, setEditor] = useState<Editor | null>(null);
    let [keyCode, setKeyCode] = useState('q');
    let containerId = useRef(`editor-container${id}`);

    useEffect(() => {
      if (!editor) {
        const newEditor = new Editor(id, name,document.getElementById(containerId.current)!, mitter);
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
    /**
     * @description: 初始化监听
     * @param {Editor} newEditor 编辑器
     * @return {*}
     */
    function handleRegister(newEditor: Editor) {
      if (!newEditor) return;
      newEditor.mitter.on(mitter.TH_CLICK, (e: any) => {
        onClick(e);
        newEditor.cacheObject = e;
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
      newEditor.mitter.onThModelAdd((obj: Object3D) => {
        onAdd(obj);
      });
      newEditor.mitter.onThModelChange((obj: Object3D) => {
        onChange(obj);
      });
    }
    const handleKeyDown = (event: any) => {
      if (!editor) return;
      setKeyCode(event.key.toLowerCase());
      switch (event.key.toLowerCase()) {
        case 'q': // Q
          editor.dragabel = true;
          editor.controls.dispose();
          break;
        case 'w': // W
          editor.controls.setTransFormMode('translate');

          break;
        case 'e': // E
          editor.controls.setTransFormMode('rotate');

          break;
        case 'r': // R
          editor.controls.setTransFormMode('scale');

          break;
        case 'backspace':
        case 'delete':
          const obj = editor.remove();
          onDelete(obj);
          break;
        default:
          break;
      }
    };
    // window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', _.debounce(handleKeyDown, 600, {}));
    return (
      <div id='th-editor' className='th-editor'>
        <div className={`mask-container-item left ${loading ? '' : 'hidden'}`}></div>
        <Loading loading={loading}>Loading...</Loading>
        <div className={`mask-container-item right ${loading ? '' : 'hidden'}`}></div>
        <div id={containerId.current} className='main-container'></div>
        {editor && (
          <EditorContext.Provider value={editor}>
            {editor && <Toolbar editor={editor} keyCode={keyCode} />}
            <Model
              modelOption={modelOption}
              onGroupAdd={(name: string) => {
                onGroupAdd(name);
              }}
            />

            {editor && <BottomBar editor={editor} />}
            {editor && <Setting editor={editor} show />}
          </EditorContext.Provider>
        )}
      </div>
    );
  },
);
export default EditorCore;
