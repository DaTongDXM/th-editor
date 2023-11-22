import React from 'react';
import './index.scss';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomModel: React.FC<any> = () => {
  return (
    <div className='custom-container'>
      <div className='toolbar'>
        <i className='iconfont th-liebiaoqiehuan'></i>

        <i className='iconfont th-tianjia'></i>
      </div>
      <div className='container'></div>
    </div>
  );
};
export default CustomModel;
