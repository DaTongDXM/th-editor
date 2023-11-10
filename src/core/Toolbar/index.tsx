/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import React, { useState } from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import Render from '@/three/render';
import {
  DragOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  SendOutlined,
} from '@ant-design/icons';

const ToolBar: React.FC<{ render: Render }> = ({ render }) => {
  const [activeName, setActiveName] = useState('DragOutlined');
  const menuList = [
    { icon: DragOutlined, title: '位置', type: 'DragOutlined' },
    { icon: SyncOutlined, title: '角度', type: 'SyncOutlined' },
    { icon: ExpandAltOutlined, title: '大小', type: 'ExpandAltOutlined' },
    { icon: ExpandOutlined, title: '全屏', type: 'ExpandOutlined' },
    { icon: PlayCircleOutlined, title: '演示', type: 'PlayCircleOutlined' },
    { icon: DownloadOutlined, title: '下载', type: 'DownloadOutlined', onClick: handleDownload },
    { icon: SendOutlined, title: '发布', type: 'SendOutlined' },
  ];
  const listIcons = menuList.map(
    (item: { icon: any; title: string; type: string; onClick?: () => any }) => (
      <div
        key={item.type}
        onClick={(e) => {
          e.stopPropagation();
          if (['DragOutlined', 'SyncOutlined', 'ExpandAltOutlined'].includes(item.type)) {
            setActiveName(item.type);
          }
          item.onClick?.apply(this);
        }}
      >
        <Tooltip placement='top' title={item.title}>
          <item.icon
            className={`th-menu-icon ${activeName === item.type ? 'active' : ''}`}
            style={{ color: 'white' }}
          />
        </Tooltip>
      </div>
    ),
  );

  /**
   * @description: 导出场景
   * @return {*}
   */
  function handleDownload() {
    let output = render.scene.toJSON();
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
