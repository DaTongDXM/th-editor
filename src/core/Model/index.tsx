/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 15:40:18
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-08-30 09:06:15
 * @Description:this is the  left menu of the editor,which contains the default model list andited by the editor
 */
import React, { Component, useEffect, useState } from 'react';
import { ModelMnueProps } from '@type/index';
import ModelList from './modelList';
import ModelPanel from './modelPanel';
const Model: React.FC<ModelMnueProps> = (props: ModelMnueProps) => {
  const { menuShow } = props;
  const [activeName, setActiveName] = useState('ModelPanel');
  let Component = ModelPanel;
  useEffect(() => {
    if (activeName === 'ModelPanel') {
      Component = ModelPanel;
    } else {
      Component = ModelList;
    }
  }, [activeName]);
  return (
    <div>
      <Component></Component>
    </div>
  );
};

export default Model;
