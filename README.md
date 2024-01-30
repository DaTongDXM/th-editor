[![Video](/docs/img/th-editor.png)](https://haokan.baidu.com/v?pd=wisenatural&vid=3000970618697972577)

<h1 align="center">th-editor</h1>
<p align="center">th-editor是一个基于three.js和react开发的web场景编辑器组件</p>

## ✨特性
* ✅ 使用React开发
* 👆提供内置模型拖拽至场景添加模型
* 👆自定义上传模型管理，模型拖拽(开发中)
* ✔️通过工具条或者快捷键切换变换控制器
* ✔️场景数据导出，场景运行(待开发)
* 🛠 提供右侧属性面板设置场景/模型做数据

## Download th-editor using npm
🚀 开发中，待发布
## Usage
``` javascript
import React, { useRef, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { createRoot } from 'react-dom/client';
import ThEditor from 'th-editor';

const AppCompent = () => {
  const configProvider = {
    // 设置antd 主题
    theme: {
      token: {
        colorPrimary: '#5d5d5d',
        borderRadius: 4,
      },
    },
  };
  const [modelOption, updateModelOption] = useImmer({
    allowEdit: true,
    groupNameLength: 10,
    layout: 'card',
    data: [],
  });
  const thEditorRef: any = useRef(null);

  useEffect(() => {
   //请求数据 通过updateModelOption为分组初始化数据
  }, []);
  // 新增分组回调
  const handleAddGroup = (name: string) => {
  };
  return (
    <>
      <div
        className='main-container'
        onClick={() => {
          console.log('点击contier');
        }}
      >
        <ThEditor
          configProvider={configProvider}
          id={123}
          ref={thEditorRef}
          modelOption={modelOption}
          onClick={(e: Event) => {
            console.log('模型点击回调');
          }}
          onGroupAdd={handleAddGroup}
          onDelete={(e: any) => {
            console.log('模型删除回调');
          }}
          onAdd={(e: any) => {'模型创建回调'}}
        ></ThEditor>
      </div>
    </>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<AppCompent />);

```
## API
---
### props

|name 名称| describe 说明|type 类型| default 默认值| 
|--|--|--|--
|configProvider|antd ConfigProvider组件的props|[antd.ConfigProvider](https://ant-design.antgroup.com/components/config-provider-cn#api)|——
|id| 编辑器渲染容器id，只需要设置，无需编写对应dom,编辑器会自动生成|string|——

#### props/modelOption
|name 名称| describe 说明|type 类型| default 默认值| 
|--|--|--|--
|allowEdit|是否允许编辑|boolean|false
|groupNameLength|分组名称最大长度|number|10
|layout| 自定义模型分组布局方式|'card' \| 'list'|'card'
|data| 自定义模型分组数据|` [{id:string,name:string,children:[]}] `|-
### events 事件

|name 名称| describe 说明| type 类型
|--|--|--
|onClick|编辑器画布点击事件|Function(e:Event){}|
|onAdd|模型添加事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onChange|模型删除事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onDelete|模型删除事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onGroupAdd|模型面板新增分组名称|Function(name:string){}|


