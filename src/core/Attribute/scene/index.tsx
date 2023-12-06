import React from 'react';
import Editor from '@/three/Editor';
import './index.scss';
import { Input, Tree } from 'antd';
const Scene: React.FC<{ editor: Editor }> = ({ editor }) => {
  const { Search } = Input;
  console.log(editor.scene.children);
  return (
    <>
      <div className='scene-continer'>
        <div className='model-list'>
          <Search />
        </div>
      </div>
    </>
  );
};
export default Scene;
