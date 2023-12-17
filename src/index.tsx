/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-17 14:08:11
 * @Description:
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { theme } from 'antd';
import 'dayjs/locale/zh-cn';
import EditorCore from '@/core/index';
import '@/icons/';
import '@/assets/css/thems/dark.scss';
import '@/assets/iconfont/iconfont.js';
import '@/assets/iconfont/iconfont.css';
import { ThEditorProps } from 'ThEditor';
import _ from 'lodash';
const ThEditor = React.forwardRef((props: ThEditorProps, ref: any) => {
  const { configProvider, ...otherProps } = props;
  const configObj = {
    theme: {
      components: {
        Tree: {
          colorText: '#000000',
          colorBgContainer: '#ffffff',
          colorPrimary: '#1677ff',
          algorithm: theme.defaultAlgorithm,
        },
        Input: {
          colorText: '#000000',
          colorBgContainer: '#ffffff',
          colorPrimary: '#1677ff',
          algorithm: theme.defaultConfig,
        },
      },
      algorithm: theme.darkAlgorithm,
    },
  };
  console.log('=====================', configObj);
  console.log('=====================', configProvider);
  console.log('=====================', _.merge(configObj, configProvider));
  return (
    <ConfigProvider {..._.merge(configObj, configProvider)} locale={zhCN}>
      <EditorCore {...otherProps} ref={ref} />
    </ConfigProvider>
  );
});
export default ThEditor;
