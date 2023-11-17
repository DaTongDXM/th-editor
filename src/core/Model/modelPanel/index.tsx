/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 18:07:07
 * @LastEditors: 武 旭东 wuxudong@zbnsec.com
 * @LastEditTime: 2023-11-17 09:35:12
 * @Description:
 */
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
// @ts-ignore
import { BorderBox7 } from '@jiaminghi/data-view-react';
import BaseModel from './base';
import CustomModel from './custom';
const components: any = {
  base: BaseModel,
  custom: CustomModel,
};
const ModelPanel: React.FC<any> = () => {
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
      <BorderBox7>
        <Component />
      </BorderBox7>
    </>
  );
};
export default ModelPanel;
