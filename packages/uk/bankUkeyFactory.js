/*
 * @Descripttion: 
 * @Author: whyjs
 * @Date: 2020-12-02 17:31:27
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-03 15:43:51
 */
import BaseUkey from './base/base_uk.js'
import BaseUkeySign from './base/baseUkeySign.js'
import CcbUkey from './ccb/ccb_uk.js'
import CcbUkeySign from './ccb/ccb_UkeySign.js'
import * as BANK_TYPE from './bankType'

const aisino_bankType = [];
aisino_bankType[BANK_TYPE.BANK_TYPE_JWL] = "JWLCREDIT";
//工商银行
aisino_bankType[BANK_TYPE.BANK_TYPE_ICBC] = "ICBCCREDIT";
//建设银行
aisino_bankType[BANK_TYPE.BANK_TYPE_CCB] = "CCBCREDIT";
//民生银行签名
aisino_bankType[BANK_TYPE.BANK_TYPE_CMBC] = "CMBCCREDIT";
//中国银行
aisino_bankType[BANK_TYPE.BANK_TYPE_BOC] = "BOCCREDIT";
//兴业银行
aisino_bankType[BANK_TYPE.BANK_TYPE_CIB] = "CIBCREDIT";
//中信银行
aisino_bankType[BANK_TYPE.BANK_TYPE_CITICIB] = "CITICIBCREDIT";
//华夏银行
aisino_bankType[BANK_TYPE.BANK_TYPE_HB] = "HBCREDIT";
//交通银行
aisino_bankType[BANK_TYPE.BANK_TYPE_JTYH] = "JTYHCREDIT";
//中国光大银行
aisino_bankType[BANK_TYPE.BANK_TYPE_CEB] = "CEBCREDIT";
//农业银行
aisino_bankType[BANK_TYPE.BANK_TYPE_ABC] = "ABCCREDIT";
//农业银行
aisino_bankType[BANK_TYPE.BANK_TYPE_SPDB] = "SPDBCREDIT";
//招商银行
aisino_bankType[BANK_TYPE.BANK_TYPE_CMB] = "CMBCREDIT";

export default class bankUkeyFactory {
  constructor() {

  }
  /**
   * 根据银行编号获取处理业务场景下针对不同业务进行操作的签名内容
   * 获取组织签名的业务逻辑操作对象
   */
  getUkeySignAction(_bankType) {
    let bankCode = aisino_bankType[_bankType];

    //建设银行
    if ("CCBCREDIT" == bankCode) {
      let ccbUkeySign = new CcbUkeySign();
      return ccbUkeySign;
    }

    let defaultUkey = new BaseUkeySign();
    return defaultUkey;
  }
  getUkeyAction(_bankType) {
    let bankCode = aisino_bankType[_bankType];
    //建设银行
    if ("CCBCREDIT" == bankCode) {
      var ccbUkey = new CcbUkey();
      return ccbUkey;
    }

    let defaultUkey = new BaseUkey();
    return defaultUkey;

  }
}