import React, { useContext, useState } from 'react';
import { EditorContext } from '@/context/editorContext';
import { Input, InputNumber, ColorPicker, Upload, Button } from 'antd';
import { Color } from 'antd/es/color-picker';
const Geometry: React.FC<any> = () => {
  const editor = useContext(EditorContext);
  const [geometry, setGeometry] = useState(editor.cacheObject);
  editor.dispatchEvent({
    type: 'th:model:change',
    obj: { a: 123 },
  });
  const handleOnChangeComplete = (value: any) => {
    console.log(value);
  };
  return (
    <div className='bottom-continer material'>
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
        <label className='label'>颜色:</label>
        <div className='value one'>
          <ColorPicker
            onChangeComplete={(value: Color) => {
              console.log(value.toHexString());
              //@ts-ignore
              editor.cacheObject.material.color.set(value.toHexString());
              editor.render();
            }}
          />
        </div>
      </div>
      <div className='row'>
        <label className='label'>自发光:</label>
        <div className='value one'>
          <ColorPicker />
        </div>
      </div>
      <div className='row'>
        <label className='label'>粗糙度:</label>
        <div className='value one'>
          <InputNumber size='small' controls={false} defaultValue={1} />
        </div>
      </div>
      <div className='row'>
        <label className='label'>贴图:</label>
        <div className='value one'>
          <Upload>
            <Button size='small'>
              <i className='iconfont th-shangchuandaochu'></i>
            </Button>
          </Upload>
        </div>
      </div>
      <div className='row'>
        <label className='label'>自发光贴图:</label>
        <div className='value one'>
          <Button size='small'>
            <i className='iconfont th-shangchuandaochu'></i>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Geometry;
