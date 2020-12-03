/*
 * @Descripttion: 
 * @Author: whyjs
 * @Date: 2020-12-03 15:40:51
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-03 19:39:01
 */


export default class CcbUkeySign {
  constructor() {}
  /**
   * 获取组织好的签名原文
   */
  setSignedOriginal(ukeyAuthSignObject) {
    ukeyAuthSignObject = {
      aa: 'asas'
    }
    //实名认证
    if (ukeyAuthSignObject.eventCode == "00") {
      ukeyAuthSignObject.signedOriginal = this.registAuthSign(ukeyAuthSignObject);
      return;
    }
    return ukeyAuthSignObject.signedOriginal;
  }

  /**
   * 实名认证签名原文
   * @param signObject
   * @returns
   */
  registAuthSign(ukeyAuthSignObject) {
    //实名认证绑ukey的签名
    if ("bindukey" == ukeyAuthSignObject.signObject.operatorType) {
      let originalMD5 = 'SH="0";SN="' + ukeyAuthSignObject.signObject.CCB_SN + '";IN="0";SI="' + ukeyAuthSignObject.signObject.signOriginal + '";|';
      let original = 'SH="0";SN="' + ukeyAuthSignObject.signObject.CCB_SN + '";IN="0";SI="' + ukeyAuthSignObject.signObject.original + '";|';
      let originalMD5_ATTR = "";
      if (ukeyAuthSignObject.signObject.userType == 'jbr') {
        originalMD5_ATTR = 'SH="1";SN="绑定经办人ukey";IN="0";SI="' + ukeyAuthSignObject.signObject.serialNo + '";|';
      } else {
        originalMD5_ATTR = 'SH="1";SN="绑定审核人ukey";IN="0";SI="' + ukeyAuthSignObject.signObject.serialNo + '";|';
      }
      originalMD5 = originalMD5 + originalMD5_ATTR;
      original = original + originalMD5_ATTR;
      ukeyAuthSignObject.signObject.original = original;
      return originalMD5;
    }

    //身份认证
    if ("identityauth" == ukeyAuthSignObject.signObject.operatorType) {
      let originalMD5 = 'SH="0";SN="' + ukeyAuthSignObject.signObject.CCB_SN + '";IN="0";SI="' + ukeyAuthSignObject.signObject.signOriginal + '";|';
      let original = 'SH="0";SN="' + ukeyAuthSignObject.signObject.CCB_SN + '";IN="0";SI="' + ukeyAuthSignObject.signObject.original + '";|';
      let originalMD5_ATTR = 'SH="1";SN="身份认证";IN="0";SI="' + ukeyAuthSignObject.signObject.serialNo + '";|';
      originalMD5 = originalMD5 + originalMD5_ATTR;
      original = original + originalMD5_ATTR;
      ukeyAuthSignObject.signObject.original = original;
      return originalMD5;
    }

    if ("submit" == ukeyAuthSignObject.signObject.operatorType) {
      let original = 'SH="1";SN="' + ukeyAuthSignObject.signObject.CCB_SN + '";IN="0";SI="' + ukeyAuthSignObject.signObject.summary + '";|';
      ukeyAuthSignObject.signObject.original = original;
      return original;
    }
    return "";
  }
}