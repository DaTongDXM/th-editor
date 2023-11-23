/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:自定义组件
 */
import React, { useState } from 'react';
import './index.scss';
import { Upload, Button, Modal, Form, Collapse, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CustomModelProps } from 'ThEditor';
const CustomModel: React.FC<CustomModelProps> = ({ groupNameLength = 50 }) => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddGroup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    groupForm.submit();
  };
  const handleCancel = () => {
    setAddOpen(false);
  };
  const [groupForm] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    groupForm.resetFields();
    setAddOpen(false);
  };
  const addGroup = (
    <div className='add-group'>
      <Form form={groupForm} onFinish={onFinish}>
        <Form.Item name='group_name' validateTrigger='onChange' rules={[{ max: groupNameLength }]}>
          <Input
            placeholder={`字符1-${groupNameLength}，按Enter确认`}
            onPressEnter={handleAddGroup}
          />
        </Form.Item>
      </Form>
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
