/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:model list from three
 */
import {
  BoxGeometry,
  CapsuleGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  OctahedronGeometry,
  PlaneGeometry,
  SphereGeometry,
} from 'three';
export const BaseModelList = [
  {
    name: 'plane',
    label: '平面',
    model: PlaneGeometry,
  },
  {
    name: 'circle',
    label: '圆形',
    model: CircleGeometry,
  },
  {
    name: 'box',
    label: '六面体',
    model: BoxGeometry,
  },
  {
    name: 'octahedron',
    label: '八面体',
    model: OctahedronGeometry,
  },
  {
    name: 'circle',
    label: '球体',
    model: ConeGeometry,
  },
  {
    name: 'cone',
    label: '圆锥',
    model: ConeGeometry,
  },
  {
    name: 'capsule',
    label: '胶囊',
    model: CapsuleGeometry,
  },

  {
    name: 'cylinder',
    label: '圆柱',
    model: CylinderGeometry,
  },
];
