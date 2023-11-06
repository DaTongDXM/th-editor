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
  TetrahedronGeometry,
  TorusGeometry,
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
    name: 'tetrahedron',
    label: '四面体',
    model: TetrahedronGeometry,
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
    name: 'cone',
    label: '圆锥',
    model: ConeGeometry,
  },
  {
    name: 'sphere',
    label: '球体',
    model: SphereGeometry,
  },
  {
    name: 'torus',
    label: '圆环',
    model: TorusGeometry,
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
