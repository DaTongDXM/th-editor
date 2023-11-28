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
    // 自定义面板配置项
    modelOption: CustomModelProps;
    /** 点击事件*/
    onClick: (e: any) => any;
    onAddGroup: (name: string) => void;
    [key: string]: any;
  }

  export type EditorCoreProps = Omit<ThEditorProps, 'configProvider'>;

  export type ModelType =
    | '3dm'
    | '3ds'
    | '3mf'
    | 'amf'
    | 'dae'
    | 'drc'
    | 'fbx'
    | 'glb'
    | 'gltf'
    | 'json'
    | 'ifc'
    | 'kmz'
    | 'ldr'
    | 'mpd'
    | 'md2'
    | 'obj'
    | 'pcd'
    | 'zip';
  /**
   * @description: 自定义模型数据
   */
  export interface CustomModel {
    id: string;
    name: string;
    modelType: ModelType;
    modelData: any;
  }
  /**
   * @description: 自定义模型分组数据
   */
  export interface CustomModelGroup {
    id: string;
    name: string;
    data: Array<CustomModel>;
  }
  export interface CustomModelProps {
    allowEdit?: boolean;
    data?: Array<CustomModelGroup>;
    groupNameLength?: number;
    layout?: 'card' | 'list';
    onAddGroup: (name: string) => void;
  }

  export interface ModelMnueProps {
    menuShow: boolean;
    modelOption: CustomModelProps;
    onAddGroup: (name: string) => void;
  }

  // interface CompoundedComponent extends React.ForwardRefExoticComponent<React.RefAttributes> {}
  declare const ThEditor: React.ForwardRefExoticComponent<
    ThEditorProps & React.RefAttributes<HTMLElement>
  >;
  export default ThEditor;
  export { ThEditor };
}
