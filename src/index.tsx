/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-16 17:23:36
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
const ThEditor = React.forwardRef((props: any, ref: any) => {
  const { configProvider, ...otherProps } = props;
  return (
    <ConfigProvider {...configProvider} locale={zhCN}>
      <EditorCore {...otherProps} editorRef={ref} />
    </ConfigProvider>
  );
});
export default ThEditor;
