declare module 'ThEditor' {
  import React from 'react';
  import { ConfigProvider } from 'antd';

  export interface ThEditorProps {
    configProvider: typeof ConfigProvider;
    // 编辑器场景id
    id?: number;
    /** 点击事件*/
    onClick: (e: any) => any;
    [key: string]: any;
  }

  export type EditorCoreProps = Omit<ThEditorProps, 'configProvider'>;

  export interface ModelMnueProps {
    menuShow: boolean;
  }

  interface CompoundedComponent extends React.ForwardRefExoticComponent<React.RefAttributes> {}
  declare const ThEditor: CompoundedComponent;
  export default ThEditor;
  export { ThEditor };
}
