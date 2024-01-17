import React, { useContext, useReducer, useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import Editor from '@/three/Editor';
import { Input, InputNumber, Switch, Button } from 'antd';
import { EditorContext } from '@/context/editorContext';
import { Object3D } from 'three';
import _ from 'lodash';
import attributeReducer from '../reducer/attributeReducer';
const Geometry: React.FC<any> = () => {
  const editor = useContext(EditorContext);
  const [cacheObject, dispatch] = useReducer(attributeReducer, editor.cacheObject!);

  // 转换角度
  const parseRota = (value: string | undefined) => {
    value = value!.replace('°', '');
    return Number(value);
  };
  const handleChange = (value: number | null | string | boolean, action: string) => {
    if (value === null) return;
    dispatch({
      type: action,
      value: value,
    });

    editor.events.dispatchEvent({
      type: editor.events.TH_MODEL_CHANGE,
      action,
      value,
    });
  };

  const handleResetData = () => {
    dispatch({
      type: 'init',
      initState: editor.cacheObject,
    });
  };
  editor.events.addEventListener('render', _.debounce(handleResetData, 100));
  useEffect(() => {
    handleResetData();
  }, [editor.cacheObject?.id]);
  return (
    <div className='info-container attribute'>
      <div className='row'>
        <label className='label'>类型:</label>
        <div className='value'>{editor.cacheObject?.type}</div>
      </div>
      <div className='row'>
        <label className='label'>识别码:</label>
        <div className='value uuid'>{editor.cacheObject?.uuid}</div>
        <Button type='link' size='small'>
          复制
        </Button>
      </div>
      <div className='row'>
        <label className='label'>名称:</label>
        <div className='value'>
          <Input value={editor.cacheObject?.name} />
        </div>
      </div>
      <div className='row'>
        <label className='label'>位置:</label>
        <div className='value'>
          X:
          <InputNumber
            size='small'
            controls={false}
            value={cacheObject?.position.x}
            onChange={(value: any) => {
              handleChange(value, editor.baseAttr.PX);
            }}
          />
          Y:
          <InputNumber
            size='small'
            controls={false}
            value={cacheObject?.position.y}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.PY);
            }}
          />
          Z:
          <InputNumber
            size='small'
            controls={false}
            value={cacheObject?.position.z}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.PZ);
            }}
          />
        </div>
      </div>
      <div className='row'>
        <label className='label'>旋转:</label>
        <div className='value'>
          X:
          <InputNumber
            size='small'
            controls={false}
            defaultValue={editor.cacheObject?.rotation.x}
            formatter={(value) => `${value}°`}
            max={360}
            min={-360}
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
            max={360}
            min={-360}
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
            max={360}
            min={-360}
            parser={parseRota}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.RZ);
            }}
          />
        </div>
      </div>
      <div className='row'>
        <label className='label'>缩放:</label>
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
        <label className='label'>可见:</label>
        <div className='value'>
          <Switch
            checkedChildren='可见'
            unCheckedChildren='不可见'
            defaultChecked={editor.cacheObject?.visible === true}
            onChange={(value) => {
              handleChange(value, editor.baseAttr.VISIBLE);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Geometry;
