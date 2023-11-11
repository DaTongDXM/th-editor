/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-24 10:23:24
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-10-12 17:03:38
 * @Description:implementing SkyBox with CubeTexture
 */
import { CubeTextureLoader } from 'three';
import type Editor from './Editor';
import path from 'path';
export default class SkyBox {
  public render: Editor;
  constructor(render: Editor) {
    this.render = render;
  }
  public load() {
    const loader = new CubeTextureLoader();
    const cubeTexture = loader.load(
      [
        path.join('/', require(`../assets/textures/skybox/dark-s_px.jpg`)),
        path.join('/', require(`../assets/textures/skybox/dark-s_nx.jpg`)),
        path.join('/', require(`../assets/textures/skybox/dark-s_py.jpg`)),
        path.join('/', require(`../assets/textures/skybox/dark-s_ny.jpg`)),
        path.join('/', require(`../assets/textures/skybox/dark-s_pz.jpg`)),
        path.join('/', require(`../assets/textures/skybox/dark-s_nz.jpg`)),
      ],
      (s) => {
        this.render.mitter.emit(this.render.mitter.TH_SKYBOX_LOAD, s);
      },
    );
    this.render.scene.background = cubeTexture;
  }
}
