/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:模型类
 */
import {
  Mesh,
  MeshPhongMaterial,
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
  BufferGeometry,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineLoop,
} from 'three';
import Events from './Events';

const twoPi = Math.PI * 2;
let geometry: BufferGeometry;
const ModelMap: any = {
  PlaneGeometry() {
    const data = {
      width: 20,
      height: 20,
      widthSegments: 1,
      heightSegments: 1,
    };
    geometry = new PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
    return geometry;
  },
  CircleGeometry() {
    const data = {
      radius: 12,
      segments: 32,
      thetaStart: 0,
      thetaLength: twoPi,
    };
    geometry = new CircleGeometry(data.radius, data.segments, data.thetaStart, data.thetaLength);
    return geometry;
  },
  TetrahedronGeometry() {
    const data = {
      radius: 10,
      detail: 0,
    };
    geometry = new TetrahedronGeometry(data.radius, data.detail);
    return geometry;
  },
  BoxGeometry() {
    const data = {
      width: 15,
      height: 15,
      depth: 15,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };
    geometry = new BoxGeometry(
      data.width,
      data.height,
      data.depth,
      data.widthSegments,
      data.heightSegments,
      data.depthSegments,
    );
    return geometry;
  },
  OctahedronGeometry() {
    const data = {
      radius: 10,
      detail: 0,
    };
    geometry = new OctahedronGeometry(data.radius, data.detail);
    return geometry;
  },
  ConeGeometry() {
    const data = {
      radius: 5,
      height: 10,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: twoPi,
    };
    geometry = new ConeGeometry(
      data.radius,
      data.height,
      data.radialSegments,
      data.heightSegments,
      data.openEnded,
      data.thetaStart,
      data.thetaLength,
    );
    return geometry;
  },
  SphereGeometry() {
    const data = {
      radius: 15,
      widthSegments: 32,
      heightSegments: 16,
      phiStart: 0,
      phiLength: twoPi,
      thetaStart: 0,
      thetaLength: Math.PI,
    };
    geometry = new SphereGeometry(
      data.radius,
      data.widthSegments,
      data.heightSegments,
      data.phiStart,
      data.phiLength,
      data.thetaStart,
      data.thetaLength,
    );
    return geometry;
  },
  TorusGeometry() {
    const data = {
      radius: 10,
      tube: 3,
      radialSegments: 16,
      tubularSegments: 100,
      arc: twoPi,
    };
    geometry = new TorusGeometry(
      data.radius,
      data.tube,
      data.radialSegments,
      data.tubularSegments,
      data.arc,
    );
    return geometry;
  },
  CapsuleGeometry() {
    const data = {
      radius: 5,
      length: 5,
      capSegments: 10,
      radialSegments: 20,
    };
    geometry = new CapsuleGeometry(data.radius, data.length, data.capSegments, data.radialSegments);
    return geometry;
  },
  CylinderGeometry() {
    const data = {
      radiusTop: 5,
      radiusBottom: 5,
      height: 10,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: twoPi,
    };
    geometry = new CylinderGeometry(
      data.radiusTop,
      data.radiusBottom,
      data.height,
      data.radialSegments,
      data.heightSegments,
      data.openEnded,
      data.thetaStart,
      data.thetaLength,
    );
    return geometry;
  },
};
class BaseModel {
  /**
   * @description: 生成基础模型
   * @param {string} name 模型名称
   * @return {*} 返回一个group，包含镜面高光材质和线性材质的一个geometry对象
   */
  static createModel(name: string, event: Events): Group {
    const geometry = ModelMap[name]();
    const lineMaterial = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const meshMaterial = new MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: DoubleSide,
      flatShading: true,
    });
    const group = new Group();
    const lineLoop = new LineLoop(geometry, lineMaterial);
    lineLoop.name = group.uuid;
    group.add(lineLoop);
    const mesh = new Mesh(geometry, meshMaterial);
    mesh.name = group.uuid;
    group.add(mesh);
    group.name = '组';
    console.log(group);
    // 添加点击监听事件，只有被创建的模型才可以触发，防止场景中其他scene（grid，可拖拽的轴等）触发
    group.addEventListener('click:model', () => {
      event.dispatchEvent({ type: event.TH_CLICK, object: group });
    });
    return group;
  }
}

export default BaseModel;
