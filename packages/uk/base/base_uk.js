/*
 * @Descripttion: 基础uk类
 * @Author: whyjs
 * @Date: 2020-12-02 17:31:27
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-03 14:34:15
 */
import md5 from 'js-md5'

export default class BaseUkey {
  constructor() {

  }
  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  /**
   *
   */
  getSerialNumber() {
    return this.generateUUID();
  }
  /**
   *
   */
  sign(ukeySenceSignObject) {
    return md5(ukeySenceSignObject.signedOriginal);
  }
  /**
   * 工程航信平台添加该方法
   * 获取Ukey参数,ukey序列号及ukey颁发者
   */
  getUkeyParams() {
    var params = {};
    params.serialNo = this.generateUUID();
    return params;
  }
}