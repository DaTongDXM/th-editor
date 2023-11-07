/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import React from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import {
  DragOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  SendOutlined,
} from '@ant-design/icons';

const ToolBar: React.FC<any> = () => {
  const menuList = [
    { icon: DragOutlined, title: '位置', type: 'DragOutlined' },
    { icon: SyncOutlined, title: '角度', type: 'SyncOutlined' },
    { icon: ExpandAltOutlined, title: '大小', type: 'ExpandAltOutlined' },
    { icon: ExpandOutlined, title: '全屏', type: 'ExpandOutlined' },
    { icon: PlayCircleOutlined, title: '演示', type: 'PlayCircleOutlined' },
    { icon: DownloadOutlined, title: '下载', type: 'DownloadOutlined' },
    { icon: SendOutlined, title: '发布', type: 'SendOutlined' },
  ];
  const listIcons = menuList.map((item: { icon: any; title: string; type: string }) => (
    <div className='icon-box' key={item.type}>
      <Tooltip placement='top' title={item.title}>
        <item.icon className={`th-icon}`} style={{ color: 'white' }} />
      </Tooltip>
    </div>
  ));
  return <div className='toolbar-continer'>{listIcons}</div>;
};
export default ToolBar;
