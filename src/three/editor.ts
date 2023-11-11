/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2023-08-23 19:28:49
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-11-11 17:58:13
 * @Description:renderer init work by three.js
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
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  Group,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Mitter } from '@/utils/mitt';

import SkyBox from './skyBox';
import Events from './Events';

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
  public controls!: OrbitControls;
  public renderer!: WebGLRenderer;
  public sceneList: Array<Scene | Group | any> = [];
  public skyBox!: SkyBox;
  public width: number;
  public height: number;
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
    this.init();
    this.registerEvent();

    const events = new Events();
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
    const gridHelper = new GridHelper(10000, 400, 0x00ffff);
    gridHelper.position.y = -8;

    this.scene.add(gridHelper);
    // 创建伪网格，设置透明，目的是通过光线投射获取鼠标的三维坐标系
    const plane = new PlaneGeometry(10000 * 400, 10000 * 400);
    var material = new MeshLambertMaterial({ color: 0xffffff, wireframe: true });
    var mesh = new Mesh(plane, material);
    mesh.rotation.x = -Math.PI / 2;
    this.grid = mesh;
    this.scene.add(mesh);
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
    this.camera.updateProjectionMatrix();
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
   * @description:初始化控制器
   * @return {*}
   */
  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.addEventListener('change', () => {
      this.render();
    });

    this.render();
  }
  /**
   * @description: 渲染函数，引入视角控制器
   * @return {*}
   */
  public render() {
    const viewHelper = new ViewHelper(this.camera, this.renderer.domElement);
    this.renderer.autoClear = false;

    this.renderer.render(this.scene, this.camera);
    viewHelper.render(this.renderer);
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
  /**
   * @description: 点击事件
   * @param {MouseEvent} e
   * @return {*}
   */
  private onClick(e: MouseEvent) {
    e.preventDefault();

    const raycaster = this.getRaycaster(e);
    // 计算物体和射线的焦点
    const intersections = raycaster.intersectObjects(this.scene.children).filter((el: any) => {
      return el.object.type !== 'GridHelper' && el.object.uuid !== this.grid.uuid;
    });
    if (intersections.length > 0) {
      const object = intersections[0].object;

      this.dragControls = new DragControls(
        [object.parent ? object.parent : object],
        this.camera,
        this.renderer.domElement,
      );
      this.dragControls.transformGroup = true;
      this.dragControls.addEventListener('drag', () => {
        this.controls.enabled = false;
        this.render();
      });
      this.dragControls.addEventListener('dragend', () => {
        this.render();
        this.controls.enabled = true;
        this.dragControls.dispose();
      });
    }
  }
  /**
   * @description: 注册事件
   * @return {*}
   */
  private registerEvent() {
    this.mitter.on(this.mitter.TH_SKYBOX_LOAD, () => {
      this.initRenderer();
      this.initControls();
    });

    this.container.addEventListener('click', this.onClick.bind(this));
  }
}