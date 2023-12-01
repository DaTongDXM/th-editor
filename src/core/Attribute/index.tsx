/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 15:40:18
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-01 16:31:30
 * @Description:右侧属性
 */
import React, { useState } from 'react';
import './index.scss';
import { Tooltip, Tabs } from 'antd';
import type { TabsProps } from 'antd';
// @ts-ignore
import { BorderBox7 } from '@jiaminghi/data-view-react';

import Project from './project';
import Scene from './scene';
const components: any = {
  project: Project,
  scene: Scene,
};
const Attribute: React.FC<any> = (props: any) => {
  const { menuShow } = props;
  const [showPanel, setShowPanel] = useState(menuShow);
  const bodyClassName = `attribute-continer ${showPanel ? 'show' : 'un-show'}`;
  let iconClassName = `iconfont ${!showPanel ? 'th-cebianlanshouqi' : 'th-cebianlanzhankai'}`;
  const [activePanel, setActivePanel] = useState('base');
  const Component: React.FC<any> = components[activePanel];
  const items: TabsProps['items'] = [
    {
      key: 'scene',
      label: '场景',
      children: '',
    },
    {
      key: 'project',
      label: '项目',
      children: '',
    },
  ];
  const handleTabClick = (key: string) => {
    setActivePanel(key);
  };
  return (
    <div className={bodyClassName}>
      <div className='attribute-continer-menu'>
        <div
          onClick={(e: any) => {
            setShowPanel(!showPanel);

            return;
          }}
        >
          <i className={iconClassName}></i>
        </div>
      </div>
      <div className='attribute-continer-body'>
        <Tabs items={items} onTabClick={handleTabClick}></Tabs>
        {activePanel === 'scene' ? <Scene /> : <Project />}
      </div>
    </div>
  );
};

export default Attribute;
