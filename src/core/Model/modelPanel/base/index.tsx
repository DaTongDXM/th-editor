/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import React from 'react';
import { Image } from 'antd';
import './index.scss';
import { BaseModelList } from '../../config/model';

const BaseModel: React.FC<any> = () => {
  // const handleDrag = (data: any): any => {
  //   console.log(data);
  // };
  const ModelCard = BaseModelList.map((model: any) => {
    const url = require(`@/assets/model/${model.name}.gif`);
    return (
      <div
        key={model.name}
        className='base-item'
        draggable
        onDragStart={(e) => {
          console.log(model);
          e.dataTransfer.setData('data', JSON.stringify(model));
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
