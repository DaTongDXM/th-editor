/*
 * @Author: wuxudong 953909305@qq.com
 * @LastEditors: wuxudong 953909305@qq.com
 * @Description:
 */
import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2 } from 'three';
import Editor from './Editor';
import BaseModel from './model';

export default class Events extends EventDispatcher {
  private container: HTMLElement;
  private raycaster!: Raycaster;
  private mouse: Vector2 = new Vector2();
  private scene: Scene;
  private camera: Camera;
  private grid: Scene;
  constructor() {
    super();
    const editor = Editor.editor;
    this.container = editor.container;
    this.scene = editor.scene;
    this.camera = editor.camera;
    this.grid = editor.grid;
    const raycaster = this.raycaster;

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
}
