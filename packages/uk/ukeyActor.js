/*
 * @Descripttion: 
 * @Author: whyjs
 * @Date: 2020-12-02 17:31:27
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-03 15:26:09
 */
import bankUkeyFactory from './bankUkeyFactory'

export default class ukeyActor {
  constructor() {
    this.ukeyfactory = new bankUkeyFactory()
  }

  signCallBack(bankCode, ukeySenceSignObject, signedCallBack) {
    ukeySenceSignObject.signedCallBack = signedCallBack;
    //获取银行ukey操作的基础组件
    let ukey = this.ukeyfactory.getUkeyAction(bankCode);
    //获取银行ukey签名基础组件
    let ukeySign = this.ukeyfactory.getUkeySignAction(bankCode);
    //根据不同的业务场景设置需要签名的原文内容
    ukeySign.setSignedOriginal(ukeySenceSignObject);
    //进行银行ukey的签名操作
    let signature = ukey.sign(ukeySenceSignObject);
    //设置签名内容
    ukeySenceSignObject.signature = signature;
    return signature;

  }

  /**
   * 获取相关的ukey参数
   */
  getUkeyParams(bankUkeyParamsObject) {
    let bankCode = ""
    if (this.isHasAttr(bankUkeyParamsObject, "bankType")) {
      bankCode = bankUkeyParamsObject.bankType;
    } else {
      bankCode = bankUkeyParamsObject;
    }
    let ukey = this.ukeyfactory.getUkeyAction(bankCode);
    let params = ukey.getUkeyParams(bankUkeyParamsObject);
    return params

  }
  /**
   * 是否有对象属性
   */
  isHasAttr(obj, attr) {
    //判断是否有该键值
    // eslint-disable-next-line no-prototype-builtins
    if (obj && obj.hasOwnProperty(attr)) {
      //如果有返回true
      return true;
    }
    return false;
  }
}