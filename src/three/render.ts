/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-23 19:28:49
 * @LastEditors: wuxudong wuxudong@zbnsec.com
 * @LastEditTime: 2023-08-29 15:14:30
 * @Description:editor init work by three.js
 */
import {
  Scene,
  AmbientLight,
  DirectionalLight,
  Camera,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import mitt, { Emitter } from 'mitt';
import SkyBox from './skyBox';
export default class Render {
  public id: string;
  public container: HTMLElement;
  public scene!: Scene;
  public emitter!: Emitter<any>;
  public camera!: any;
  public controls!: OrbitControls;
  public renderer!: WebGLRenderer;
  public skyBox!: SkyBox;
  private width: number;
  private height: number;
  constructor(id: string, container: HTMLElement) {
    this.id = id;
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.container = container;
    this.init();
    this.registerEvent();
  }
  /**
   * create scene with skybox, grid,light,camera
   */
  private init() {
    this.emitter = mitt();
    this.scene = new Scene();
    const gridHelper = new GridHelper(10000, 400, 0x00ffff);
    gridHelper.position.y = -8;
    this.scene.add(gridHelper);
    this.initSkybox();
    this.initLight();
    this.initCamera();
  }
  private initLight() {
    const ambient = new AmbientLight(0x111111, 1);
    this.scene.add(ambient);
    const directionalLight = new DirectionalLight(0xffffff, 0.125);
    directionalLight.position.set(200, 200, 200);
    this.scene.add(directionalLight);
  }
  private initCamera() {
    this.camera = new PerspectiveCamera(
      45,
      this.container.offsetWidth / this.container.offsetHeight,
      1,
      2000,
    );
    this.camera.position.set(200, 100, 200);
    this.camera.lookAt(0, 400, 0);
  }
  private initRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setClearColor(0x444444);

    this.container.appendChild(this.renderer.domElement);
  }
  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
    this.renderer.render(this.scene, this.camera);
  }
  private initSkybox() {
    if (!this.skyBox) this.skyBox = new SkyBox(this);
    this.skyBox.load();
  }
  private registerEvent() {
    this.emitter.on('skybox:loaded', () => {
      this.initRenderer();
      this.initControls();
    });
    window.onresize = () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    };
  }
}
