import React, { useContext, useState } from 'react';
import { EditorContext } from '@/context/editorContext';
import { Input, InputNumber, Switch, Button } from 'antd';
const Geometry: React.FC<any> = () => {
  const editor = useContext(EditorContext);
  const [geometry, setGeometry] = useState(editor.cacheObject);
  editor.dispatchEvent({
    type: 'th:model:change',
    obj: { a: 123 },
  });

  return (
    <div className='info-container geometry'>
      <div className='row'>
        <label className='label'>类型:</label>
        <div className='value'></div>
      </div>
      <div className='row'>
        <label className='label'>识别码:</label>
        <div className='value uuid'>{'bd3e4f5c-0e94-4fbc-80dc-dbc0568c7357'}</div>
        <Button type='link' size='small'>
          复制
        </Button>
      </div>
      <div className='row'>
        <label className='label'>名称:</label>
        <div className='value'>
          <Input value={''} />
        </div>
      </div>
      <div className='row'>
        <label className='label'>半径:</label>
        <div className='value one'>
          <InputNumber size='small' controls={false} defaultValue={10} />
        </div>
      </div>
      <div className='row'>
        <label className='label'>片面分段:</label>
        <div className='value one'>
          <InputNumber size='small' controls={false} defaultValue={1} />
        </div>
      </div>
      <div className='row'>
        <label className='label'>顶点法线:</label>
        <div className='value'>
          <Switch checkedChildren='可见' unCheckedChildren='不可见' defaultChecked={true} />
        </div>
      </div>
    </div>
  );
};
export default Geometry;
