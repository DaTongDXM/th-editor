/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-23 19:28:49
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-05 16:55:56
 * @Description:editor init work by three.js
 */
import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  Vector2,
  Raycaster,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mitter } from '@/utils/mitt';
import SkyBox from './skyBox';
export default class Render {
  /** id */
  public id: string;
  public container: HTMLElement;
  public scene!: Scene;
  public mitter!: Mitter;
  public camera!: any;
  public controls!: OrbitControls;
  public renderer!: WebGLRenderer;
  public skyBox!: SkyBox;
  private width: number;
  private height: number;
  /**
   *
   * @param id editor id
   * @param container canvas container
   */
  constructor(id: string, container: HTMLElement, mitter: Mitter) {
    this.id = id;
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.container = container;
    this.mitter = mitter;
    this.init();
    this.registerEvent();
  }
  /**
   * create scene with skybox, grid,light,camera
   */
  private init() {
    this.scene = new Scene();
    const gridHelper = new GridHelper(10000, 400, 0x00ffff);
    gridHelper.position.y = -8;
    this.scene.add(gridHelper);
    this.initSkybox();
    this.initLight();
    this.initCamera();
  }
  /**
   * @description: 创建灯光
   * @return {*}
   */
  private initLight() {
    const ambient = new AmbientLight(0x111111, 1);
    this.scene.add(ambient);
    const directionalLight = new DirectionalLight(0xffffff, 0.125);
    directionalLight.position.set(200, 200, 200);
    this.scene.add(directionalLight);
  }
  /**
   * @description: 创建相机
   * @return {*}
   */
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
  /**
   * @description: 创建渲染器
   * @return {*}
   */
  private initRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setClearColor(0x444444);

    this.container.appendChild(this.renderer.domElement);
  }
  /**
   * @description:
   * @return {*}
   */
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
    this.mitter.on(this.mitter.TH_SKYBOX_LOAD, () => {
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
    this.container.addEventListener('click', (e) => {
      const mouse = new Vector2();
      mouse.x = (e.offsetX / this.container.offsetWidth) * 2 - 1;
      mouse.y = -(e.offsetY / this.container.offsetHeight) * 2 + 1;
      // 创建一个投射器
      const raycaster = new Raycaster();
      // 通过鼠标和相机位置更新射线
      raycaster.setFromCamera(mouse, this.camera);
      // 计算物体和射线的焦点
      const intersects = raycaster.intersectObjects(this.scene.children).filter((el: any) => {
        return el.object.type !== 'GridHelper';
      });
      this.mitter.emit(this.mitter.TH_CLICK, { x: mouse.x, y: mouse.y, e, intersects });
    });
    this.container.addEventListener('drop', (e) => {
      console.log('drop', e);
    });
  }
}
