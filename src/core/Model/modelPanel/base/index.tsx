/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import React, { useState } from 'react';
import { Image } from 'antd';
import './index.scss';
import { BaseModelList } from '../../config/model';

const BaseModel: React.FC<any> = () => {
  // const handleDrag = (data: any): any => {
  //   console.log(data);
  // };
  let [draggable, seDraggable] = useState(false);
  const ModelCard = BaseModelList.map((model: any) => {
    const url = require(`@/assets/model/${model.name}.gif`);
    return (
      <div
        key={model.name}
        className='base-item'
        draggable={draggable}
        onDragStart={(e) => {
          console.log(model);
          e.dataTransfer.setData('data', JSON.stringify(model));
        }}
        onMouseEnter={() => {
          seDraggable(true);
        }}
        onMouseOut={() => {
          seDraggable(false);
        }}
      >
        <Image src={url} preview={false} />
        <label>{model.label}</label>
      </div>
    );
  });

  return (
    <>
      <div className='base-container'>{ModelCard}</div>
    </>
  );
};
export default BaseModel;
