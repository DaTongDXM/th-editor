/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-24 10:23:24
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-08-25 18:06:02
 * @Description:implementing SkyBox with CubeTexture
 */
import { CubeTextureLoader } from 'three';
import type Render from './render';
import path from 'path';
export default class SkyBox {
  public render: Render;
  constructor(render: Render) {
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
        this.render.emitter.emit('skybox:loaded', s);
      },
      (p) => {},
      (error) => {},
    );
    this.render.scene.background = cubeTexture;
  }
}
