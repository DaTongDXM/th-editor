/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-29 15:40:18
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-07 14:11:46
 * @Description:this is the  left menu of the editor,which contains the default model list andited by the editor
 */
import React, { useState } from 'react';
import './index.scss';

import { ModelMnueProps } from 'ThEditor';

import ModelPanel from './modelPanel';

const Model: React.FC<ModelMnueProps> = (props: ModelMnueProps) => {
  const { menuShow, modelOption, onGroupAdd } = props;
  const [showPanel, setShowPanel] = useState(menuShow);
  const bodyClassName = `model-continer ${showPanel ? 'show' : 'un-show'}`;
  let iconClassName = `iconfont ${showPanel ? 'th-cebianlanshouqi' : 'th-cebianlanzhankai'}`;
  return (
    <div className={bodyClassName}>
      <div className='model-continer-body'>
        <ModelPanel
          modelOption={modelOption}
          onGroupAdd={(name: string) => {
            onGroupAdd(name);
          }}
        />
      </div>
      <div className='model-continer-menu'>
        {' '}
        <div
          onClick={(e: any) => {
            setShowPanel(!showPanel);

            return;
          }}
        >
          <i className={iconClassName}></i>
        </div>
      </div>
    </div>
  );
};

export default Model;
