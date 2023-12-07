/*
 * @Author: wuxudong 953909305@qq.com
 * @Date: 2023-10-12 14:44:06
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-07 17:03:53
 * @Description: 事件处理类
 */
import mitt, { Emitter } from 'mitt';
import { Object3D } from 'three';
const mitter: Emitter<any> = mitt<any>();

class Mitter {
  /**
   * @description: 加载天空盒
   * @return {*}
   */
  public readonly TH_SKYBOX_LOAD = 'th:skybox:loaded';

  public emitSkyboxLoad(sucess: any) {
    mitter.emit(this.TH_SKYBOX_LOAD, sucess);
  }

  public onSkyboxLoad(callback: any) {
    mitter.on(this.TH_SKYBOX_LOAD, callback);
  }
  /**
   * @description: 场景点击事件
   * @return {*}
   */
  public readonly TH_CLICK = 'th:click';

  public emitThClick(sucess: any) {
    mitter.emit(this.TH_CLICK, sucess);
  }

  public onThClick(callback: any) {
    mitter.on(this.TH_CLICK, callback);
  }

  /**
   * @description: 模型添加事件
   * @return {*}
   */
  public readonly TH_MODEL_ADD = 'th:model:add';

  public emitThModelAdd(obj: Object3D) {
    console.log(111);
    mitter.emit(this.TH_MODEL_ADD, obj);
  }
  public onThModelAdd(callback: (obj: Object3D) => void) {
    mitter.on(this.TH_MODEL_ADD, callback);
  }

  /**
   * @description: 全局警告msg
   * @return {*}
   */
  public readonly TH_MSG_WARNING = 'th:msg:warning';

  public emitThMsgWaring(msg: string) {
    console.log(msg);
    mitter.emit(this.TH_MSG_WARNING, msg);
  }
  public onThMsgWaring(callback: any) {
    mitter.on(this.TH_MSG_WARNING, callback);
  }

  /**
   * @description: 全局错误msg
   * @return {*}
   */
  public readonly TH_MSG_ERROR = 'th:msg:error';
  public emitThMsgError(msg: string) {
    mitter.emit(this.TH_MSG_ERROR, msg);
  }
  public onThMsgError(callback: any) {
    mitter.on(this.TH_MSG_ERROR, callback);
  }
  /**
   * 触发
   */
  public emit(...args: any) {
    mitter.emit.apply(this, args);
  }
  /**
   * 监听
   */
  public on(...args: any) {
    mitter.on.apply(this, args);
  }
  /**
   * 卸载
   */
  public off(...args: any) {
    mitter.off.apply(this, args);
  }
}
export { Mitter };
export default new Mitter();
