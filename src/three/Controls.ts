/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: 武 旭东 wuxudong@zbnsec.com
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
  constructor() {
    const editor = Editor.editor;
    this.camera = editor.camera;
    this.container = editor.container;
    this.scene = editor.scene;
    this.orbitControl = this.createOrbitControl();
    this.transformControl = this.createTransformControl();
    this.initTransformControlEvent();

    this.orbitControl.addEventListener('change', () => {
      Editor.editor.render();
    });
  }
  public static getControlInstance(): Control {
    if (!this.control) {
      this.control = new Control();
    }
    return this.control;
  }
  public attach(mesh: Object3D) {
    // this.transform.attach(mesh);
  }

  private createOrbitControl() {
    const controls = new OrbitControls(this.camera, this.container);
    controls.enabled = false;
    return controls;
  }
  public update() {
    this.orbitControl.update();
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
      Editor.editor.render();
    });
    this.transformControl.addEventListener('change', (event) => {
      Editor.editor.render();
    });
  }
}
