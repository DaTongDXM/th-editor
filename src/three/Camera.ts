import { PerspectiveCamera } from 'three';
import Editor from './Editor';
export default class Camera {
  public perspectiveCamera: PerspectiveCamera;
  public editor: Editor;
  constructor() {
    this.editor = Editor.editor;
    this.perspectiveCamera = this.createPerspectiveCamera();
    //请注意，在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
    this.perspectiveCamera.updateProjectionMatrix();
    this.perspectiveCamera.position.set(0, 100, 200);
    this.perspectiveCamera.lookAt(0, 400, 0);
  }
  private createPerspectiveCamera() {
    const perspectiveCamera = new PerspectiveCamera(
      45,
      this.editor.container.offsetWidth / this.editor.container.offsetHeight,
      1,
      2000,
    );
    return perspectiveCamera;
  }
}
