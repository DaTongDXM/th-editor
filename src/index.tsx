/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-22 10:13:55
 * @Description:
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import EditorCore from '@/core/index';
import '@/icons/';
import '@/assets/css/thems/dark.scss';
import '@/assets/iconfont/iconfont.js';
import '@/assets/iconfont/iconfont.css';
import { ThEditorProps } from 'ThEditor';
const ThEditor = React.forwardRef((props: ThEditorProps, ref: any) => {
  const { configProvider, ...otherProps } = props;
  return (
    <ConfigProvider {...configProvider} locale={zhCN}>
      <EditorCore {...otherProps} ref={ref} />
    </ConfigProvider>
  );
});
export default ThEditor;
