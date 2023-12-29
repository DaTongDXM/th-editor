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
  LoadingManager,
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  Vector3,
  Box3,
} from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Events from './Events';

import Editor from './Editor';

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
   * @param {string} label 模型名称
   * @param {string} model 模型类型
   * @param {string} position 鼠标位置
   * @return {*} 返回一个group，包含镜面高光材质和线性材质的一个geometry对象
   */
  static createModel(label: string, model: string, position: Vector3, event: Events) {
    const geometry = ModelMap[model]();
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
    lineLoop.name = lineLoop.type;
    group.add(lineLoop);
    const mesh = new Mesh(geometry, meshMaterial);
    mesh.name = mesh.type;
    group.add(mesh);
    const groupPosition = position.clone();
    groupPosition.setY(18);
    group.position.copy(groupPosition);
    group.name = label;
    // this.setName(label, group);
    // const sprite = this.makeTextSprite(
    //   label,
    //   {
    //     fontsize: 40,
    //   },
    //   group,
    // );
    // sprite && group.add(sprite);
    // console.log(group);

    // 添加点击监听事件，只有被创建的模型才可以触发，防止场景中其他scene（grid，可拖拽的轴等）触发
    group.addEventListener('click:model', () => {
      event.dispatchEvent({ type: event.TH_CLICK, object: group });
    });
    return group;
  }
  /**
   * @description: 通过TextGeometry创建字体
   * @param {string} name
   * @param {Group} group
   * @return {*}
   */
  static setName(name: string, group: Group): void {
    const startTime = performance.now();
    const manager = new LoadingManager();
    const file = require(`../assets/thfont/stkaiti_regular.json`);
    console.log('字体加载', Number(performance.now() - startTime).toFixed(2));

    manager.setURLModifier((url) => {
      url = URL.createObjectURL(new Blob([JSON.stringify(file)], { type: 'application/json' }));
      console.log('字体回调1', Number(performance.now() - startTime).toFixed(2));
      return url;
    });
    const loader = new FontLoader(manager);
    loader.load('stkaiti_regular.json', (font) => {
      console.log('字体回调2', Number(performance.now() - startTime).toFixed(2));

      let textGeometry = new TextGeometry(name, {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelSegments: 5,
      });
      const textMaterial = [
        new MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff }), // front
        new MeshPhongMaterial({ color: 0xffffff }), // side
      ];
      const text = new Mesh(textGeometry, textMaterial);

      text.position.y = -22;
      text.position.x = -8;
      group.add(text);
      console.log(text);
      const endTime = performance.now();
      console.log('字体生成', Number(endTime - startTime).toFixed(2));
      Editor.editor.render();
    });
  }

  /**
   * @description: 创建字体精灵
   * @param {any} label 文本内容
   * @param {any} parameters
   * @param {Group} group
   * @return {*}
   */
  static makeTextSprite(label: any, parameters: any, group: Group) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty('fontface') ? parameters['fontface'] : 'Arial';

    /* 字体大小 */
    var fontsize = parameters.hasOwnProperty('fontsize') ? parameters['fontsize'] : 60;

    /* 边框厚度 */
    var borderThickness = parameters.hasOwnProperty('borderThickness')
      ? parameters['borderThickness']
      : 4;

    /* 创建画布 */
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    if (!context) return;
    /* 字体加粗 */
    context.font = +fontsize + 'px ' + fontface;

    context.lineWidth = borderThickness;

    /* 字体颜色 */
    context.fillStyle = '#ffffff';
    context.fillText(label, borderThickness, fontsize + borderThickness);

    /* 画布内容用于纹理贴图 */
    var texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new SpriteMaterial({ map: texture });
    var sprite = new Sprite(spriteMaterial);
    //取模型中心位置
    const boundingBox = new Box3().setFromObject(group.children[0]);
    const center = new Vector3();
    boundingBox.getCenter(center);
    center.setY(center.y + 15);
    center.setX(center.x + 10);
    sprite.position.copy(center);

    /* 缩放比例 */
    sprite.scale.set(40, 40, 40);
    sprite.name = label;
    return sprite;
  }
}

export default BaseModel;
