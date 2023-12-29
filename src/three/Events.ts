/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:事件类
 */
import {
  Camera,
  EventDispatcher,
  Material,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
} from 'three';

import { DragControls } from 'three/examples/jsm/controls/DragControls';
import Editor from './Editor';
import BaseModel from './Model';
import Control from './Controls';
import { BaseAttr } from './Config';

export default class Events extends EventDispatcher {
  private container: HTMLElement;
  private raycaster!: Raycaster;
  private mouse: Vector2 = new Vector2();
  private scene: Scene;
  private camera: PerspectiveCamera;
  private grid: Scene;
  private dragControls: DragControls;
  private control: Control;
  private editor: Editor;

  /**
   * @description: 加载天空盒
   * @return {*}
   */
  public readonly TH_SKYBOX_LOAD = 'th:skybox:loaded';
  public readonly TH_CLICK = 'th:click';
  /**
   * @description: 帧时
   * @return {*}
   */
  public readonly TH_TIME = 'th:time';
  constructor() {
    super();
    const scope = this;
    const editor = Editor.editor;
    this.editor = editor;
    this.container = editor.container;
    this.scene = editor.scene;
    this.camera = editor.camera;
    this.grid = editor.grid;

    this.dragControls = editor.dragControls;
    this.control = Control.getControlInstance();

    window.onresize = () => {
      editor.width = editor.container.offsetWidth;
      editor.height = editor.container.offsetHeight;
      editor.renderer.setSize(editor.width, editor.height);
      editor.camera.aspect = editor.width / editor.height;
      editor.camera.updateProjectionMatrix();
      editor.render();
    };

    this.container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    // 画布拖拽事件
    this.container.addEventListener('drop', (e) => {
      const raycaster = this.getRaycaster(e);
      var intersects = raycaster.intersectObject(this.grid);

      if (intersects.length > 0) {
        var intersectPoint = intersects[0].point;

        try {
          const { label, model } = JSON.parse(e.dataTransfer!.getData('data'));
          const obj = BaseModel.createModel(label, model, intersectPoint, scope);

          this.editor.cacheObject = obj;
          this.scene.add(obj);

          this.control.attach(obj);
          editor.mitter.emitThModelAdd(obj);

          editor.render();
        } catch (e) {
          console.log(e);
          editor.mitter.emitThMsgError(e + '');
        }
      } else {
        editor.mitter.emitThMsgWaring('请将模型拖拽至网格平面！');
      }
    });

    // 画布点击事件

    this.container.addEventListener('click', this.onClick.bind(this));
    this.register();
  }

  private register() {
    this.addEventListener('th:model:change', (obj: any) => {
      const { action, value } = obj;
      console.log(obj, action, value);
      if (!action) return;

      switch (action) {
        case this.editor.baseAttr.PX:
          {
            this.editor.cacheObject?.position.setX(value);
          }
          break;
        case this.editor.baseAttr.PY:
          {
            this.editor.cacheObject?.position.setY(value);
          }
          break;
        case this.editor.baseAttr.PZ:
          {
            this.editor.cacheObject?.position.setZ(value);
          }
          break;
        case this.editor.baseAttr.RX:
          {
            this.editor.cacheObject?.rotateX(value * (Math.PI / 180));
          }
          break;
        case this.editor.baseAttr.RY:
          {
            this.editor.cacheObject?.rotateY(value * (Math.PI / 180));
          }
          break;
        case this.editor.baseAttr.RZ:
          {
            this.editor.cacheObject?.rotateZ(value * (Math.PI / 180));
          }
          break;
        case this.editor.baseAttr.SX:
          {
            this.editor.cacheObject?.scale.setX(value);
          }
          break;
        case this.editor.baseAttr.SY:
          {
            this.editor.cacheObject?.scale.setY(value);
          }
          break;
        case this.editor.baseAttr.SZ:
          {
            this.editor.cacheObject?.scale.setZ(value);
          }
          break;
        case this.editor.baseAttr.VISIBLE:
          this.editor.cacheObject!.visible = value;
          break;
        default:
          break;
      }
      this.editor.render();
    });
    this.addEventListener('th:model:focus', (option: any) => {
      const obj = this.scene.getObjectById(option.id);
      if (obj) {
        console.log(obj instanceof Mesh);
        // console.log(obj.material);
        this.editor.cacheObject = obj;
        // 触发点击事件，添加transform控制器
        this.dispatchEvent({ type: this.TH_CLICK });
        // 更新orbitControl，使模型处于可视区
        this.control.orbitControl.target.copy(obj.position);
        this.animate();
      }
    });
  }
  private animate() {
    // requestAnimationFrame(this.animate);
    this.control.orbitControl.update();
    this.editor.render();
  }
  /**
   * @description: 获取一个射线投射器
   * @param {MouseEvent} e
   * @return {*}
   */
  private getRaycaster(e: MouseEvent): Raycaster {
    const mouse = new Vector2();
    mouse.x = (e.offsetX / this.container.offsetWidth) * 2 - 1;
    mouse.y = -(e.offsetY / this.container.offsetHeight) * 2 + 1;
    // 创建一个投射器
    const raycaster = new Raycaster();
    // 通过鼠标和相机位置更新射线
    raycaster.setFromCamera(mouse, this.camera);
    return raycaster;
  }

  /**
   * @description: 点击事件
   * @param {MouseEvent} e
   * @return {*}
   */
  private onClick(e: MouseEvent) {
    e.stopPropagation();

    const raycaster = this.getRaycaster(e);
    // 计算物体和射线的焦点
    const intersections = raycaster.intersectObjects(this.scene.children).filter((el: any) => {
      return (
        el.object.type !== 'GridHelper' &&
        el.object.uuid !== this.grid.uuid &&
        el.object.type !== 'TransformControlsPlane'
      );
    });
    if (intersections.length > 0) {
      const object = intersections[0].object;

      if (object.parent) {
        // 设置点击对象为缓存对象
        this.editor.cacheObject = object.parent ? object.parent : object;
        console.log(this.editor.cacheObject);
        if (!this.editor.dragabel) {
          console.log('点击', object);
          object.parent.dispatchEvent({ type: 'click:model' });
        } else {
          this.dragControls = new DragControls(
            [object.parent ? object.parent : object],
            this.camera,
            this.container,
          );
          this.dragControls.transformGroup = true;
          this.dragControls.addEventListener('drag', () => {
            Editor.editor.controls.orbitControl.enabled = false;
            this.dispatchEvent({ type: 'render' });
          });
          this.dragControls.addEventListener('dragend', () => {
            this.dispatchEvent({ type: 'render' });
            Editor.editor.controls.orbitControl.enabled = true;
            this.dragControls.dispose();
          });
          Editor.editor.render();
        }
      }
    } else {
      this.dispatchEvent({ type: this.TH_CLICK, object: null });
    }
  }
}
