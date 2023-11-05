/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 18:07:07
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-05 15:30:35
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import BaseModel from './base';
import CustomModel from './custom';
const components: any = {
  base: BaseModel,
  custom: CustomModel,
};
const ModelPanel = (props: any) => {
  const [activePanel, setActivePanel] = useState('base');
  const Component: React.FC<any> = components[activePanel];
  const items: TabsProps['items'] = [
    {
      key: 'base',
      label: '基础',
      children: '',
    },
    {
      key: 'custom',
      label: '自定义',
      children: '',
    },
  ];

  const handleTabClick = (key: string) => {
    setActivePanel(key);
  };
  return (
    <>
      <Tabs items={items} centered onTabClick={handleTabClick}></Tabs>
      <Component />
    </>
  );
};
export default ModelPanel;
