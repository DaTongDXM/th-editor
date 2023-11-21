/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import Editor from '@/three/Editor';
import {
  DragOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  SendOutlined,
} from '@ant-design/icons';

const ToolBar: React.FC<{ editor: Editor; keyCode: number }> = ({ editor, keyCode = 81 }) => {
  const [activeName, setActiveName] = useState('shoushoushi');

  const menuList = [
    {
      icon: 'shoushoushi',
      title: '抓取(Q)',
      type: 'shoushoushi',
      keyCode: 81,
      iconFont: true,
      onClick: handleSetMode,
    },

    {
      icon: DragOutlined,
      title: '位置(W)',
      type: 'DragOutlined',
      keyCode: 87,
      onClick: handleSetMode,
    },
    {
      icon: SyncOutlined,
      title: '角度(E)',
      type: 'SyncOutlined',
      keyCode: 69,
      onClick: handleSetMode,
    },
    {
      icon: ExpandAltOutlined,
      title: '大小(R)',
      type: 'ExpandAltOutlined',
      keyCode: 82,
      onClick: handleSetMode,
    },
    { icon: PlayCircleOutlined, title: '演示', type: 'PlayCircleOutlined' },
    { icon: DownloadOutlined, title: '下载', type: 'DownloadOutlined', onClick: handleDownload },
    { icon: SendOutlined, title: '发布', type: 'SendOutlined' },
  ];
  const listIcons = menuList.map(
    (item: {
      icon: any;
      title: string;
      keyCode?: number;
      type: string;
      onClick?: (args?: any) => any;
      iconFont?: boolean;
    }) => (
      <div
        key={item.type}
        onClick={(e) => {
          e.stopPropagation();
          if (
            ['shoushoushi', 'DragOutlined', 'SyncOutlined', 'ExpandAltOutlined'].includes(item.type)
          ) {
            setActiveName(item.type);
          }
          item.onClick?.call(this, item.keyCode || 0);
        }}
      >
        <Tooltip placement='top' title={item.title}>
          {item.iconFont ? (
            <i
              className={`iconfont th-menu-icon th-${item.icon} ${
                activeName === item.type ? 'active' : ''
              }`}
              style={{ color: 'white' }}
            ></i>
          ) : (
            <item.icon
              className={`th-menu-icon ${activeName === item.type ? 'active' : ''}`}
              style={{ color: 'white' }}
            />
          )}
        </Tooltip>
      </div>
    ),
  );
  useEffect(() => {
    const activeItem = menuList.find((item) => item.keyCode === keyCode);
    if (activeItem) {
      setActiveName(activeItem.type);
    }
  }, [keyCode]);

  function handleSetMode(code: number) {
    console.log(code);
    const event = new KeyboardEvent('keydown', {
      keyCode: code,
    });
    window.dispatchEvent(event);
  }
  /**
   * @description: 导出场景
   * @return {*}
   */
  function handleDownload() {
    let output = editor.scene.toJSON();
    try {
      output = JSON.stringify(output, null, '\t');
      output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
    } catch (e) {
      output = JSON.stringify(output);
    }
    saveString(output, 'scene.json');
  }
  function saveString(text: string, filename: string) {
    save(new Blob([text], { type: 'text/plain' }), filename);
  }
  const link = document.createElement('a');
  function save(blob: Blob, filename: string) {
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }

    link.href = URL.createObjectURL(blob);
    link.download = filename || 'data.json';
    link.dispatchEvent(new MouseEvent('click'));
  }

  return <div className='toolbar-continer'>{listIcons}</div>;
};
export default ToolBar;
