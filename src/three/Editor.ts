/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-23 19:28:49
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-25 17:32:04
 * @Description:renderer init work by three.js
 */
import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  Group,
  Object3D,
} from 'three';

import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Mitter } from '@/utils/mitt';

import SkyBox from './skyBox';
import Events from './Events';
import Controls from './Controls';
import Camera from './Camera';
export enum BaseAttr {
  // 位置x
  PX = 'px',
  // 位置y
  PY = 'py',
  // 位置z
  PZ = 'pz',

  // 旋转x
  RX = 'rx',
  // 旋转y
  RY = 'ry',
  // 旋转z
  RZ = 'rz',

  // 缩放x
  SX = 'sx',
  // 缩放y
  SY = 'sy',
  // 缩放z
  SZ = 'sz',
  VISIBLE = 'visible',
  INIT = 'init',
}
export default class Editor {
  public static editor: Editor;
  /** id */
  public id: string;
  public container: HTMLElement;
  public dragControls!: DragControls;
  public scene!: Scene;
  public mitter!: Mitter;
  public camera!: any;
  public grid!: any;
  public controls!: Controls;
  public renderer!: WebGLRenderer;
  public sceneList: Array<Scene | Group | any> = [];
  public skyBox!: SkyBox;
  public width: number;
  public height: number;
  public events: Events;

  public cacheObject: Object3D | null = null;
  public dragabel = true;

  public baseAttr = BaseAttr;

  /**
   *
   * @param id renderer id
   * @param container canvas container
   */
  constructor(id: string, container: HTMLElement, mitter: Mitter) {
    Editor.editor = this;
    this.id = id;
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.container = container;
    this.mitter = mitter;
    this.camera = new Camera().perspectiveCamera;
    this.init();
    this.events = new Events();

    this.registerEvent();
  }

  public static getInstance(id?: string, container?: HTMLElement) {
    if (container === undefined && Editor.editor !== undefined) {
      return Editor.editor;
    }
  }

  /**
   * create scene with skybox, grid,light,camera
   */
  private init() {
    this.scene = new Scene();
    // 创建网格
    const gridHelper = new GridHelper(1000, 100, 0x00ffff);
    gridHelper.name = '网格';
    gridHelper.position.y = -8;

    this.scene.add(gridHelper);
    // 创建伪网格，设置透明，目的是通过光线投射获取鼠标的三维坐标系
    const plane = new PlaneGeometry(1000, 1000);
    var material = new MeshLambertMaterial({ color: 0xffffff, wireframe: true });
    var mesh = new Mesh(plane, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -8;
    mesh.visible = false;
    this.grid = mesh;
    this.scene.add(mesh);
    this.initSkybox();
    this.initLight();
  }
  /**
   * @description: 创建灯光
   * @return {*}
   */
  private initLight() {
    const ambient = new AmbientLight(0x111111, 1);
    ambient.name = '环境光';
    this.scene.add(ambient);
    const directionalLight = new DirectionalLight(0xffffff, 0.125);
    directionalLight.position.set(200, 200, 200);
    directionalLight.name = '平行光';
    this.scene.add(directionalLight);
  }

  /**
   * @description: 创建渲染器
   * @return {*}
   */
  private initRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight - 1);
    this.renderer.setClearColor(0x444444);

    this.container.appendChild(this.renderer.domElement);
  }
  /**
   * @description:初始化控制器
   * @return {*}
   */
  private initControls() {
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enabled = true;
    // this.controls.addEventListener('change', () => {
    //   this.render();
    // });
    // this.render();
  }
  /**
   * @description: 渲染函数，引入视角控制器
   * @return {*}
   */
  public render() {
    const startTime = performance.now();
    const viewHelper = new ViewHelper(this.camera, this.renderer.domElement);
    this.renderer.autoClear = false;

    this.renderer.render(this.scene, this.camera);

    viewHelper.render(this.renderer);
    const endTime = performance.now();
    this.events.dispatchEvent({
      type: this.events.TH_TIME,
      time: Number(endTime - startTime).toFixed(2),
    });
  }
  /**
   * @description: 初始化天空盒
   * @return {*}
   */
  private initSkybox() {
    if (!this.skyBox) this.skyBox = new SkyBox(this);
    this.skyBox.load();
  }

  /**
   * @description: 注册事件
   * @return {*}
   */
  private registerEvent() {
    this.events.addEventListener('render', () => {
      this.render();
    });
    this.events.addEventListener(this.events.TH_SKYBOX_LOAD, () => {
      this.initRenderer();
      // this.initControls();
      this.controls = new Controls();
      this.controls.orbitControl.enabled = true;
      this.update();
    });
    this.events.addEventListener(this.events.TH_CLICK, (model: any) => {
      const { object = this.cacheObject } = model;
      console.log('点击', object);

      if (object) {
        this.cacheObject = object;
        if (this.cacheObject) {
          this.controls.transformControl.attach(this.cacheObject);
          this.scene.add(this.controls.transformControl);
          this.render();
        }
        console.log('点击模型:', this.cacheObject);
      } else {
        // this.controls.transformControl.detach();
      }
    });
  }

  public update() {
    this.render();
    // window.requestAnimationFrame(() => this.update());
  }
  public remove(): Object3D | null {
    let obj: any = null;
    if (this.cacheObject) {
      this.scene.remove(this.cacheObject);
      this.cacheObject = null;
    }

    this.controls.dispose();
    this.render();
    return obj;
  }
  public dispatchEvent(args: any) {
    console.log(args);
    this.events.dispatchEvent(args);
  }
  public addEventListener(args: any, callback: any) {
    this.events.addEventListener(args, callback);
  }
}
