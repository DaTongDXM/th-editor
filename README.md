<!--
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description: 
-->


# th-editor
---


<video id="main-video" x-webkit-airplay="allow" controls="" poster="http://f7.baidu.com/it/u=3512268727,229097286&amp;fm=222&amp;app=106&amp;f=JPEG" src="https://bjhnewmda2.bdstatic.com/4d6d6552496135465743534732633566/7541466455756974/7d7656b7e3e86f6c2a2ef2745512288370ef5d573d28a552a8c4560d29dd0c72a7dab052898e06ca1ecee7e023187d24a2b1e838e590e9d84720e97f2bb035077e2bad7bbd16e8be4fc00428ecb04352.mp4?auth_key=1706601209-0-0-2dfc998027a09f2147b06ed9acc721c4">
                    </video>

## th-editor是干什么的？
*  th-editor是一个基于three.js和react的web编辑器组件
*  提供内置模型拖拽，自定义上传模型拖拽(待开发)向场景添加模型
*  提供不同的属性变化控制器及场景数据导出，场景运行(待开发)
*  提供右侧属性面对场景/模型做数据更新
## Download th-editor using npm

## Usage

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
|layout| 布局方式|'card' \| 'list'|'card'
|data| 分组数据|` [{id:string,name:string,children:[]}] `|-
### events 事件

|name 名称| describe 说明| type 类型
|--|--|--
|onClick|编辑器画布点击事件|Function(e:Event){}|
|onAdd|模型添加事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onChange|模型删除事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onDelete|模型删除事件|Function(obj:[Object3d](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D)\|null){}|
|onGroupAdd|模型面板新增分组名称|Function(name:string){}|


