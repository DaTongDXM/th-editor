import React, { useContext } from 'react';
import Editor from '@/three/Editor';
import { Input, InputNumber, Switch } from 'antd';
import { EditorContext } from '@/context/editorContext';
const Geometry: React.FC<any> = () => {
  const editor = useContext(EditorContext);
  // 转换角度
  const parseRota = (value: string | undefined) => {
    value = value!.replace('°', '');
    return Number(value);
  };
  const handleChange = (value: number | null | string, action: string) => {
    if (value === null) return;
    editor.events.dispatchEvent({
      type: 'th:model:change',
      action,
      value,
    });
  };
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
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.position.x}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.PX);
            }}
          />
          Y:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.position.y}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.PY);
            }}
          />
          Z:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.position.z}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.PZ);
            }}
          />
        </div>
      </div>
      <div className='row'>
        旋转:
        <div className='value'>
          X:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.rotation.x}
            formatter={(value) => `${value}°`}
            parser={parseRota}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.RX);
            }}
          />
          Y:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.rotation.y}
            formatter={(value) => `${value}°`}
            parser={parseRota}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.RY);
            }}
          />
          Z:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.rotation.z}
            formatter={(value) => `${value}°`}
            parser={parseRota}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.RZ);
            }}
          />
        </div>
      </div>
      <div className='row'>
        缩放:
        <div className='value'>
          X:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.scale.x}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.SX);
            }}
          />
          Y:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.scale.y}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.SY);
            }}
          />
          Z:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.scale.z}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.SZ);
            }}
          />
        </div>
      </div>
      <div className='row'>
        可见:
        <div className='value'>
          <Switch
            checkedChildren='可见'
            unCheckedChildren='不可见'
            defaultChecked={editor.cacheObject?.visible === true}
          />
        </div>
      </div>
    </div>
  );
};
export default Geometry;
