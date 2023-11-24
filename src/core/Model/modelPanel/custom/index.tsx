/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:自定义组件
 */
import React, { useState } from 'react';
import './index.scss';
import { Upload, Button, Modal, Form, Collapse, Input, Tooltip } from 'antd';
import type { CollapseProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CustomModelProps } from 'ThEditor';
const CustomModel: React.FC<CustomModelProps> = ({ groupNameLength = 50 }) => {
  // #region 顶部
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
        <Form.Item
          name='group_name'
          validateTrigger='onChange'
          rules={[{ max: groupNameLength, message: `字符1-${groupNameLength}` }]}
        >
          <Input
            placeholder={`字符1-${groupNameLength}，按Enter确认`}
            onPressEnter={handleAddGroup}
            allowClear
          />
        </Form.Item>
      </Form>
    </div>
  );
  // #endregion

  // #region 面板

  // #endregion
  return (
    <div className='custom-container'>
      <div className='toolbar'>
        <Tooltip placement='bottom' title='切换布局'>
          <i className='iconfont th-liebiaoqiehuan'></i>
        </Tooltip>
        <Tooltip placement='bottom' title={addOpen ? '取消' : '添加分组'}>
          <i
            className={`iconfont ${addOpen ? 'th-chexiao' : 'th-tianjia'}`}
            onClick={() => {
              setAddOpen(!addOpen);
            }}
          ></i>
        </Tooltip>
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
