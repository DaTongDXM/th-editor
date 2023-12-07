/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:底部工具条
 */
import React, { useState } from 'react';
import { Tooltip, Tag } from 'antd';
import Editor from '@/three/Editor';
import './bottom.scss';

const BottomBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const tootipStyle = {
    fontSize: 12,
  };
  const [fullscreen, setFullscreen] = useState(false);
  const [ms, setMs] = useState(0);

  function handleFullscreen() {
    let app = document.querySelector('#th-editor');
    if (!fullscreen) {
      app!.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  }
  editor.addEventListener('th:time', ({ time }: any) => {
    time && setMs(time);
    // console.log(e);
  });

  // #region 快捷键
  const [shortKey, setShortKey] = useState(false);
  const keyList = [
    {
      label: '空间拖拽',
      key0: 'Q',
    },
    {
      label: '位移控制器',
      key0: 'W',
    },
    {
      label: '旋转控制器',
      key0: 'E',
    },
    {
      label: '缩放控制器',
      key0: 'R',
    },
    {
      label: '复制',
      key0: 'Ctrl',
      key1: 'C',
    },
    {
      label: '粘贴',
      key0: 'Ctrl',
      key1: 'V',
    },
  ];
  let shortKeyDom = (
    <div className='short-key'>
      <i
        className='iconfont th-guanbi'
        onClick={() => {
          setShortKey(false);
        }}
      ></i>
      <div className='container'>
        {keyList.map((item: any) => {
          return (
            <div className='key-item' key={item.label}>
              <div className='label'>{item.label}</div>
              <div>
                <Tag>{item.key0}</Tag>
                {item.key1 ? (
                  <>
                    <span>+</span>
                    <Tag>{item.key1}</Tag>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  // #endregion
  return (
    <div className='bottom-container'>
      <div className='bottom-container-count'>
        <div>物体：8</div>
        <div>帧时：{ms}ms</div>
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
        <Tooltip
          overlayStyle={tootipStyle}
          placement='top'
          title={`${fullscreen ? '推出全屏' : '全屏'}`}
        >
          <i
            className={`iconfont ${fullscreen ? 'th-fullscreen-exit-line' : 'th-fullscreen-line'} `}
            onClick={handleFullscreen}
          ></i>
        </Tooltip>
        <Tooltip overlayStyle={tootipStyle} placement='top' title='快捷键说明'>
          <i
            className='iconfont th-jianpan'
            onClick={() => {
              setShortKey(true);
            }}
          ></i>
        </Tooltip>
      </div>
      {shortKey && shortKeyDom}
    </div>
  );
};

export default BottomBar;
