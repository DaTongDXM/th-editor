import React, { useEffect, useState } from 'react';
import Editor from '@/three/Editor';

import { Input, Tree, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Object3D, Material as IMaterial, Mesh } from 'three';
import type { DataNode } from 'antd/es/tree';
import Attribute from './components/attribute';
import Geometry from './components/geometry';
import Material from './components/material';
const Scene: React.FC<{ editor: Editor }> = ({ editor }) => {
  const { Search } = Input;
  const getTreeData = (objList: Array<Object3D>): Array<DataNode> => {
    const res: any = [];
    for (let i = 0; i < objList.length; i++) {
      const item = objList[i];
      if (!item.name) continue;
      if (item.children.length > 0) {
        res.push({
          title: item.name,
          key: item.id,
          children: getTreeData(item.children),
        });
      } else {
        res.push({
          title: `${item.name}(${item.type})`,
          key: item.id,
        });
      }
    }

    return res;
  };
  const [treeData, setTreeData] = useState(getTreeData(editor.scene.children));

  editor.mitter.onThModelAdd((obj: Object3D) => {
    const res = getNewTree(treeData, obj.parent!.id, getTreeData([obj]));

    setTreeData(getTreeData(editor.scene.children));
  });

  const getNewTree = (
    oldList: Array<DataNode & { children?: any }>,
    key: string | number,
    childrenList: Array<DataNode & { children?: any }>,
  ): any => {
    let objList = [...oldList];
    for (let i = 0; i < objList.length; i++) {
      if (objList[i].key === key) {
        objList[i].children
          ? objList[i].children.concat(childrenList)
          : (objList[i].children = childrenList);
        break;
      }
      if (Array.isArray(objList[i].children)) {
        let result = getNewTree(objList[i].children, key, childrenList);
        if (result) {
          return result;
        }
      }
    }
    return objList.concat(childrenList);
  };
  const [activePanel, setActivePanel] = useState('attribute');
  const items: TabsProps['items'] = [
    {
      key: 'attribute',
      label: '属性',
      children: editor.cacheObject && <Attribute />,
    },
    {
      key: 'geometry',
      label: '几何组件',
      // @ts-ignore
      children: editor.cacheObject && editor.cacheObject.geometry && <Geometry />,
    },
    {
      key: 'material',
      label: '材质组件',
      // @ts-ignore
      children: editor.cacheObject && editor.cacheObject.material && <Material />,
    },
  ];
  const handleTabClick = (key: string) => {
    setActivePanel(key);
  };
  useEffect(() => {
    console.log(
      'editor.cacheObjecteditor.cacheObjecteditor.cacheObjecteditor.cacheObject',
      editor.cacheObject,
    );
  }, [editor.cacheObject?.id]);
  const handleSelect = (keys: any, e: any) => {
    editor.events.dispatchEvent({
      type: 'th:model:focus',
      id: e.node.key,
    });
  };
  return (
    <>
      <div className='scene-continer'>
        <div className='model-list'>
          <Search />
          <Tree
            blockNode
            showLine
            defaultExpandAll
            treeData={treeData}
            onSelect={handleSelect}
          ></Tree>
        </div>
        <Tabs
          className='model-attr'
          activeKey={activePanel}
          items={items}
          onTabClick={handleTabClick}
        ></Tabs>
      </div>
    </>
  );
};
export default Scene;
