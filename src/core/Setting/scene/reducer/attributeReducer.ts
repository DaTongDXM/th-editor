import type { Object3D } from 'three';
import { BaseAttr } from '@/three/Config';
interface Action {
  type: string;
  value: number | boolean | string;
  [key: string]: any;
}
export default function attributeReducer(draft: Object3D, action: Action) {
  const { type, value } = action;
  debugger;
  switch (type) {
    case BaseAttr.PX:
      draft.position.x = Number(value);
      // return {
      //   ...state,
      //   ...{
      //     position: {
      //       ...state.position,
      //       x: value,
      //     },
      //   },
      // } as Object3D;
      break;
    case BaseAttr.PY:
      draft.position.y = Number(value);
      break;
    // return {
    //   ...state,
    //   ...{
    //     position: {
    //       ...state.position,
    //       y: value,
    //     },
    //   },
    // } as Object3D;
    case BaseAttr.PZ:
      draft.position.z = Number(value);
      break;
    // return {
    //   ...state,
    //   ...{
    //     position: {
    //       ...state.position,
    //       z: value,
    //     },
    //   },
    // } as Object3D;
    // case BaseAttr.RX:
    //   return {
    //     ...state,
    //     ...{
    //       rotation: { x: value },
    //     },
    //   } as Object3D;
    // case BaseAttr.RY:
    //   return {
    //     ...state,
    //     ...{
    //       rotation: { y: value },
    //     },
    //   } as Object3D;
    // case BaseAttr.PZ:
    //   return {
    //     ...state,
    //     ...{
    //       rotation: { z: value },
    //     },
    //   } as Object3D;
    // case BaseAttr.SX:
    //   return {
    //     ...state,
    //     ...{
    //       scale: {
    //         x: value,
    //       },
    //     },
    //   } as Object3D;
    // case BaseAttr.SY:
    //   return {
    //     ...state,
    //     ...{
    //       scale: {
    //         y: value,
    //       },
    //     },
    //   } as Object3D;
    // case BaseAttr.SZ:
    //   return {
    //     ...state,
    //     ...{
    //       scale: {
    //         z: value,
    //       },
    //     },
    //   } as Object3D;
    // default:
    //   console.log(state.position.x);
    //   return { ...state } as Object3D;
  }
}
