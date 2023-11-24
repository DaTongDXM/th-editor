/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
declare module 'ThEditor' {
  import React from 'react';
  import { ConfigProvider } from 'antd';

  export interface ThEditorProps {
    configProvider: ConfigProvider;
    // 编辑器场景id
    id?: string;
    /** 点击事件*/
    onClick: (e: any) => any;
    [key: string]: any;
  }

  export type EditorCoreProps = Omit<ThEditorProps, 'configProvider'>;

  export interface CustomModelProps {
    groupNameLength?: number;
  }

  export interface ModelMnueProps {
    menuShow: boolean;
  }

  // interface CompoundedComponent extends React.ForwardRefExoticComponent<React.RefAttributes> {}
  declare const ThEditor: React.ForwardRefExoticComponent<
    ThEditorProps & React.RefAttributes<HTMLElement>
  >;
  export default ThEditor;
  export { ThEditor };
}
