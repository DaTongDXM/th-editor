/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:控制器辅助类
 */
import { Mesh, Object3D } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Editor from './Editor';

export default class Control {
  private transform: TransformControls;
  public static control: Control;
  constructor(editor: Editor) {
    this.transform = new TransformControls(editor.camera, editor.container);
    this.transform.addEventListener('change', editor.render);
    this.transform.addEventListener('dragging-changed', function (event) {
      // editor.controls.enabled = !event.value;
    });
    editor.scene.add(this.transform);
  }
  public static getControlInstance(editor: Editor): Control {
    if (!this.control) {
      this.control = new Control(editor);
    }
    return this.control;
  }
  public attach(mesh: Object3D) {
    this.transform.attach(mesh);
  }
}
