/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:底部工具条
 */
import React from 'react';
import { Tooltip } from 'antd';
import './bottom.scss';

const BottomBar: React.FC<any> = () => {
  const tootipStyle = {
    fontSize: 12,
  };
  return (
    <div className='bottom-container'>
      <div className='bottom-container-count'>
        <div>物体：8</div>
        <div>帧时：0.44ms</div>
        <div></div>
      </div>
      <div id='bottom-container-bar' className='bottom-container-bar'>
        <Tooltip
          overlayStyle={tootipStyle}
          placement='top'
          title='回到原点'
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
        >
          <i className='iconfont th-ditudingwei'></i>
        </Tooltip>
        <Tooltip overlayStyle={tootipStyle} placement='top' title='快捷键说明'>
          <i className='iconfont th-jianpan'></i>
        </Tooltip>
      </div>
    </div>
  );
};

export default BottomBar;
