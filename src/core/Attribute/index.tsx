/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:右侧属性区域
 */
import React, { useState } from 'react';
import { Tooltip } from 'antd';

const Attribute: React.FC<any> = () => {
  const [show, setShow] = useState(false);
  const bodyClassName = `attribute-continer ${show ? 'show' : 'un-show'}`;
  return (
    <div className={bodyClassName}>
      <div></div>
    </div>
  );
};
export default Attribute;
