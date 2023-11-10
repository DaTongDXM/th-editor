/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 15:40:18
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-07 14:30:23
 * @Description:this is the  left menu of the editor,which contains the default model list andited by the editor
 */
import React, { useState } from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import { AppstoreAddOutlined, PartitionOutlined } from '@ant-design/icons';
import { ModelMnueProps } from '@type/index';
import ModelList from './modelList';
import ModelPanel from './modelPanel';
const componentMap: any = {
  ModelList,
  ModelPanel,
};
const Model: React.FC<ModelMnueProps> = (props: ModelMnueProps) => {
  const { menuShow } = props;
  const menuList = [
    { icon: AppstoreAddOutlined, title: '模型', type: 'ModelPanel' },
    { icon: PartitionOutlined, title: '列表', type: 'ModelList' },
  ];
  const [showPanel, setShowPanel] = useState(menuShow);
  const bodyClassName = `model-continer ${showPanel ? 'show' : 'un-show'}`;
  const [activeName, setActiveName] = useState('ModelPanel');

  const listIcons = menuList.map((item: { icon: any; title: string; type: string }) => (
    <div
      key={item.type}
      onClick={(e: any) => {
        if (item.type === activeName) {
          setShowPanel(!showPanel);

          return;
        } else {
          !showPanel && setShowPanel(!showPanel);
        }
        setActiveName(item.type);
      }}
    >
      <Tooltip placement='right' title={item.title}>
        <item.icon
          className={`th-menu-icon ${activeName === item.type && showPanel ? 'active' : ''}`}
          style={{ color: 'white' }}
        />
      </Tooltip>
    </div>
  ));

  let Component: any = componentMap[activeName];

  return (
    <div className={bodyClassName}>
      <div className='model-continer-body'>
        <Component />
      </div>
      <div className='model-continer-menu'>{listIcons}</div>
    </div>
  );
};

export default Model;
