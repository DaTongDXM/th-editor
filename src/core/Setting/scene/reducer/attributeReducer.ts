import type { Object3D } from 'three';
import { BaseAttr } from '@/three/Config';
interface Action {
  type: BaseAttr;
  value: number;
  [key: string]: any;
}
export default function attributeReducer(state: Object3D, action: Action) {
  const { type, value } = action;
  switch (type) {
    case BaseAttr.PX:
      return {
        ...state,
        ...{
          position: {
            x: value,
          },
        },
      } as Object3D;

    case BaseAttr.PY:
      return {
        ...state,
        ...{
          position: {
            y: value,
          },
        },
      } as Object3D;
    case BaseAttr.PZ:
      return {
        ...state,
        ...{
          position: {
            z: value,
          },
        },
      } as Object3D;
    case BaseAttr.RX:
      return {
        ...state,
        ...{
          rotation: { x: value },
        },
      } as Object3D;
    case BaseAttr.RY:
      return {
        ...state,
        ...{
          rotation: { y: value },
        },
      } as Object3D;
    case BaseAttr.PZ:
      return {
        ...state,
        ...{
          rotation: { z: value },
        },
      } as Object3D;
    case BaseAttr.SX:
      return {
        ...state,
        ...{
          scale: {
            x: value,
          },
        },
      } as Object3D;
    case BaseAttr.SY:
      return {
        ...state,
        ...{
          scale: {
            y: value,
          },
        },
      } as Object3D;
    case BaseAttr.SZ:
      return {
        ...state,
        ...{
          scale: {
            z: value,
          },
        },
      } as Object3D;
    default:
      return;
  }
}
