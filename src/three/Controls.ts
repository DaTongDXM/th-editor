/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:控制器辅助类
 */
import { Object3D, PerspectiveCamera, Scene } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Editor from './Editor';

export default class Control {
  public transformControl: TransformControls;
  public orbitControl: OrbitControls;
  public static control: Control;
  private camera: PerspectiveCamera;
  private container: HTMLElement;
  private scene: Scene;
  private editor: Editor;
  constructor() {
    this.editor = Editor.editor;
    this.camera = this.editor.camera;
    this.container = this.editor.container;
    this.scene = this.editor.scene;
    this.orbitControl = this.createOrbitControl();
    this.transformControl = this.createTransformControl();
    this.initTransformControlEvent();

    this.orbitControl.addEventListener('change', () => {
      this.editor.render();
    });
  }
  public static getControlInstance(): Control {
    if (!this.control) {
      this.control = new Control();
    }
    return this.control;
  }
  public attach(mesh: Object3D) {
    // this.transformControl.attach(mesh);
    if (!this.editor.dragabel) {
      console.log(this.transformControl.getMode());
      this.setTransFormMode(this.transformControl.getMode());
    }
  }

  private createOrbitControl() {
    const controls = new OrbitControls(this.camera, this.container);
    controls.enabled = false;
    return controls;
  }
  public update() {
    this.orbitControl.update();
  }
  //#region transformControl

  public setTransFormMode(type: 'translate' | 'rotate' | 'scale') {
    if (!this.editor.cacheObject) return;

    this.transformControl.attach(this.editor.cacheObject);
    this.scene.add(this.transformControl);

    this.transformControl.setMode(type);
    this.editor.dragabel = false;
    this.editor.render();
  }

  private createTransformControl() {
    const transformControls = new TransformControls(this.camera, this.container);
    return transformControls;
  }

  private initTransformControlEvent() {
    this.transformControl.addEventListener('mouseDown', (e) => {
      // this.transing = true;
    });
    this.transformControl.addEventListener('dragging-changed', (event) => {
      this.orbitControl.enabled = !event.value;
      this.editor.render();
    });
    this.transformControl.addEventListener('change', (event) => {
      this.editor.render();
    });
  }
  /**
   * @description: 销毁transformControl
   * @return {*}
   */
  public dispose() {
    this.editor.controls.transformControl.detach();
    this.editor.render();
  }
  //#endregion
}
