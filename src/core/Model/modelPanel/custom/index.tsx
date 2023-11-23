/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:自定义组件
 */
import React, { useState } from 'react';
import './index.scss';
import { Upload, Button, Modal, Form, Collapse, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomModel: React.FC<any> = () => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddGroup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (!value) {
    } else {
      value.length < 50 && setAddOpen(false);
    }
  };
  const handleCancel = () => {
    setAddOpen(false);
  };
  const addGroup = (
    <div className='add-group'>
      <Input placeholder='字符1-50，按Enter确认' onPressEnter={handleAddGroup} />
    </div>
  );
  return (
    <div className='custom-container'>
      <div className='toolbar'>
        <i className='iconfont th-liebiaoqiehuan'></i>

        <i
          className={`iconfont ${addOpen ? 'th-chexiao' : 'th-tianjia'}`}
          onClick={() => {
            setAddOpen(!addOpen);
          }}
        ></i>
      </div>
      <div className='container'>
        {addOpen && addGroup}
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
      {/* <Modal maskClosable={false} open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
        123
      </Modal> */}
    </div>
  );
};
export default CustomModel;
