import type { Object3D } from 'three';
import { BaseAttr } from '@/three/Config';
interface Action {
  type: string;
  value?: number | boolean | string;
  [key: string]: any;
}
export default function attributeReducer(state: Object3D, action: Action) {
  const { type, value, initState } = action;

  switch (type) {
    case BaseAttr.PX:
      return {
        ...state,
        ...{
          position: {
            ...state.position,
            x: value,
          },
        },
      } as Object3D;

    case BaseAttr.PY:
      return {
        ...state,
        ...{
          position: {
            ...state.position,
            y: value,
          },
        },
      } as Object3D;
    case BaseAttr.PZ:
      return {
        ...state,
        ...{
          position: {
            ...state.position,
            z: value,
          },
        },
      } as Object3D;
    case BaseAttr.RX:
      return {
        ...state,
        ...{
          rotation: { ...state.rotation, x: value },
        },
      } as Object3D;
    case BaseAttr.RY:
      return {
        ...state,
        ...{
          rotation: { ...state.rotation, y: value },
        },
      } as Object3D;
    case BaseAttr.RZ:
      return {
        ...state,
        ...{
          rotation: { ...state.rotation, z: value },
        },
      } as Object3D;
    case BaseAttr.SX:
      return {
        ...state,
        ...{
          scale: {
            ...state.scale,
            x: value,
          },
        },
      } as Object3D;
    case BaseAttr.SY:
      return {
        ...state,
        ...{
          scale: {
            ...state.scale,
            y: value,
          },
        },
      } as Object3D;
    case BaseAttr.SZ:
      return {
        ...state,
        ...{
          scale: {
            ...state.scale,
            z: value,
          },
        },
      } as Object3D;
    case BaseAttr.VISIBLE:
      return {
        ...state,
        visible: value,
      } as Object3D;
    default:
      console.log(initState.position.x);
      return { ...initState } as Object3D;
  }
}
