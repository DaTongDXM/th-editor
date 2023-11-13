/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:事件类
 */
import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2 } from 'three';

import { DragControls } from 'three/examples/jsm/controls/DragControls';
import Editor from './Editor';
import BaseModel from './model';

export default class Events extends EventDispatcher {
  private container: HTMLElement;
  private raycaster!: Raycaster;
  private mouse: Vector2 = new Vector2();
  private scene: Scene;
  private camera: Camera;
  private grid: Scene;
  private dragControls: DragControls;
  /**
   * @description: 加载天空盒
   * @return {*}
   */
  public readonly TH_SKYBOX_LOAD = 'th:skybox:loaded';
  constructor() {
    super();
    const editor = Editor.editor;
    this.container = editor.container;
    this.scene = editor.scene;
    this.camera = editor.camera;
    this.grid = editor.grid;
    const raycaster = this.raycaster;
    this.dragControls = editor.dragControls;

    let cacheObject: Object3D | null = null;

    window.onresize = () => {
      editor.width = editor.container.offsetWidth;
      editor.height = editor.container.offsetHeight;
      editor.renderer.setSize(editor.width, editor.height);
      editor.camera.aspect = editor.width / editor.height;
      editor.camera.updateProjectionMatrix();
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
        console.log('Intersect point: ', intersectPoint);
        const { model, name, label } = JSON.parse(e.dataTransfer!.getData('data'));
        try {
          const mesh = BaseModel.createModel(model);
          mesh.position.copy(intersectPoint);
          this.scene.add(mesh);

          editor.render();
        } catch (e) {
          console.log(e);
          editor.mitter.emitThMsgError(e + '');
        }
      } else {
        console.log(intersects);
        editor.mitter.emitThMsgWaring('请将模型拖拽至网格平面！');
      }
    });

    // 画布点击事件

    this.container.addEventListener('click', this.onClick.bind(this));
  }

  // public dispatchEvent(args:string|{type:string,message:any}){

  // };

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
    e.preventDefault();
    this.dispatchEvent({ type: 'redner' });
    const raycaster = this.getRaycaster(e);
    // 计算物体和射线的焦点
    const intersections = raycaster.intersectObjects(this.scene.children).filter((el: any) => {
      return el.object.type !== 'GridHelper' && el.object.uuid !== this.grid.uuid;
    });
    if (intersections.length > 0) {
      const object = intersections[0].object;

      this.dragControls = new DragControls(
        [object.parent ? object.parent : object],
        this.camera,
        this.container,
      );
      this.dragControls.transformGroup = true;
      this.dragControls.addEventListener('drag', () => {
        Editor.editor.controls.enabled = false;
        this.dispatchEvent({ type: 'render' });
        console.log('00000');
      });
      this.dragControls.addEventListener('dragend', () => {
        this.dispatchEvent({ type: 'render' });
        Editor.editor.controls.enabled = true;
        this.dragControls.dispose();
      });
    }
  }
}
