/*
 * @Author: wuxudong 953909305@qq.com
 * @Date: 2023-10-12 14:44:06
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-10-12 17:02:00
 * @Description: 事件处理类
 */
import mitt, { Emitter } from 'mitt';

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
