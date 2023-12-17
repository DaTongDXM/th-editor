/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:自定义组件
 */
import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Form, Collapse, Input, Tooltip, Popover } from 'antd';
import type { CollapseProps } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { CustomModelProps } from 'ThEditor';
const CustomModel: React.FC<CustomModelProps> = ({
  allowEdit = false,
  groupNameLength = 10,
  layout = 'card',
  data,
  onGroupAdd,
}) => {
  // #region 顶部
  const [addOpen, setAddOpen] = useState(false);
  const handleAddGroup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    groupForm.submit();
  };

  const [groupForm] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values.group_name);
    onGroupAdd(values.group_name);
    groupForm.resetFields();
    setAddOpen(false);
  };
  const addGroup = (
    <div className='add-group'>
      <Form autoComplete='off' form={groupForm} onFinish={onFinish}>
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
  const genExtra = () => {
    return (
      <Popover
        content={
          <>
            <div>
              <Button
                icon={<UploadOutlined />}
                type='text'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                上传
              </Button>
            </div>
            <div>
              <Button
                icon={<DeleteOutlined />}
                type='text'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                删除
              </Button>
            </div>
          </>
        }
        placement='bottom'
        trigger='hover'
      >
        <i
          className='iconfont th-gengduo-shuxiang'
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></i>
      </Popover>
    );
  };

  console.log(data);
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    if (!data) return;
    let res: CollapseProps['items'] = [];

    console.log(items);
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      res.push({
        key: el.id,
        label: el.name,
        children: <div>分组一分组一分组一分组一分组一</div>,
        extra: genExtra(),
      });
    }
    setItems(res);
  }, [data]);
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
        <Collapse defaultActiveKey={['1']} expandIconPosition='start' items={items} size='small' />
      </div>
    </div>
  );
};
export default CustomModel;
