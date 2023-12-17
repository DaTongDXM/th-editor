import React from 'react';
import Editor from '@/three/Editor';
import { Input, InputNumber, Switch } from 'antd';
const Geometry: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className='attribute-continer'>
      <div className='row'>
        类型:<div className='value'>{editor.cacheObject?.type}</div>
      </div>
      <div className='row'>
        名称:
        <div className='value'>
          <Input value={editor.cacheObject?.name} />
        </div>
      </div>
      <div className='row'>
        位置:
        <div className='value'>
          X:
          <InputNumber size='small' controls={false} />
          Y:
          <InputNumber size='small' controls={false} />
          Z:
          <InputNumber size='small' controls={false} />
        </div>
      </div>
      <div className='row'>
        旋转:
        <div className='value'>
          X:
          <InputNumber size='small' controls={false} />
          Y:
          <InputNumber size='small' controls={false} />
          Z:
          <InputNumber size='small' controls={false} />
        </div>
      </div>
      <div className='row'>
        缩放:
        <div className='value'>
          X:
          <InputNumber size='small' controls={false} />
          Y:
          <InputNumber size='small' controls={false} />
          Z:
          <InputNumber size='small' controls={false} />
        </div>
      </div>
      <div className='row'>
        可见:
        <div className='value'>
          <Switch checkedChildren='可见' unCheckedChildren='不可见' defaultChecked />
        </div>
      </div>
    </div>
  );
};
export default Geometry;
