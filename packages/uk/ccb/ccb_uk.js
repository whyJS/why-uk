/*
 * @Descripttion: 建行UK类
 * @Author: whyjs
 * @Date: 2020-12-02 17:31:27
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-03 14:33:59
 */
import BaseUkey from '../base/base_uk.js'

//CCBCA控件
let CCB_GMSignCtl;
//签名策略
let signatureRules
//ukey编号
let ukeySn
//浏览器类型
let Sys = {}

export default class CcbUkey extends BaseUkey {
  constructor() {
    super()
    this.init()
  }
  init() {
    var ua = navigator.userAgent.toLowerCase();
    var s;
    // eslint-disable-next-line no-cond-assign
    (s = ua.match(/(msie\s|trident.*rv:)([\w.]+)/)) ?
    (Sys.ie = s[2] || "0") :
    // eslint-disable-next-line no-cond-assign
    (s = ua.match(/firefox\/([\d.]+)/)) ?
    (this.Sys.firefox = s[1]) :
    // eslint-disable-next-line no-cond-assign
    (s = ua.match(/chrome\/([\d.]+)/)) ?
    (Sys.chrome = s[1]) :
    // eslint-disable-next-line no-cond-assign
    (s = ua.match(/opera.([\d.]+)/)) ?
    (this.Sys.opera = s[1]) :
    // eslint-disable-next-line no-cond-assign
    (s = ua.match(/version\/([\d.]+).*safari/)) ?
    (Sys.safari = s[1]) :
    0;
    this.obtainTheSignatureRules();
  }

  //获取证书序列号(供页面调用)
  getSerialNumber(bankUkeyParamsObject) {
    let params = {};
    try {
      let info = this.getUkeySN();
      // eslint-disable-next-line valid-typeof
      if (!info || typeof info == "undefined" || typeof info == "unknown") {
        //alert("请重新插入建行UKEY，如有疑问请联系客服！");
        return "";
      }

      if (info == "-2") {
        //alert("请重新插入建行UKEY，如有疑问请联系客服！");
        return "";
      }
      params.serialNo = info;
      params.issureDn = "CCBCA";
      params.eventCode = bankUkeyParamsObject.eventCode;
      params.algorithmType = this.getUkeyAlgorithmType();
      params.caIssuer = "RA_CCB";
      return info;
    } catch (e) {
      alert("获取序列号失败");
      return "";
    }
  }

  //证书签名(供页面调用)
  sign(ukeySenceSignObject) {
    ukeySenceSignObject.isDirectCall = true;
    var original = ukeySenceSignObject.signedOriginal;
    // var result = {};
    var params = {};
    try {
      if (
        !original ||
        original == "" ||
        typeof original == "undefined" ||
        // eslint-disable-next-line valid-typeof
        typeof original == "unknown"
      ) {
        alert("签名原文不能为空，签名失败。请联系客服。");
        ukeySenceSignObject.signature = "签名失败";
        ukeySenceSignObject.ukeyNo = "";
        ukeySenceSignObject.isSuccess = false;
        ukeySenceSignObject.ukeyObject = "";
        if (ukeySenceSignObject.signedCallBack != null) {
          ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
        }
        return "签名失败";
      }
      var signature = this.ccbcaSign(original);

      if (
        !signature ||
        typeof signature == "undefined" ||
        // eslint-disable-next-line valid-typeof
        typeof signature == "unknown"
      ) {
        alert("获取签名内容为空，签名失败。请联系客服。");
        ukeySenceSignObject.signature = "签名失败";
        ukeySenceSignObject.ukeyNo = "";
        ukeySenceSignObject.isSuccess = false;
        ukeySenceSignObject.ukeyObject = "";
        if (ukeySenceSignObject.signedCallBack != null) {
          ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
        }
        return "签名失败";
      }
      ukeySenceSignObject.signature = signature;
      ukeySenceSignObject.ukeyNo = this.getUkeySN();
      ukeySenceSignObject.isSuccess = true;

      params.serialNo = ukeySenceSignObject.ukeyNo;
      params.issureDn = "CCBCA";
      params.eventCode = ukeySenceSignObject.eventCode;
      params.eventNode = ukeySenceSignObject.eventNode;
      //签名验签文
      params.signature = signature;
      //签名原文--已经进行MD5
      params.signedOriginal = original;

      var json = JSON.stringify(params);
      json = encodeURIComponent(json);
      ukeySenceSignObject.ukeyObject = json;
      if (this.isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (this.isHasAttr(ukeySenceSignObject.callBackParams, "params")) {
          ukeySenceSignObject.callBackParams.params.issureDn = params.issureDn;
        }
      }
      if (this.isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (this.isHasAttr(ukeySenceSignObject.callBackParams, "ukeyParams")) {
          ukeySenceSignObject.callBackParams.ukeyParams.issureDn =
            params.issureDn;
        }
      }
      if (ukeySenceSignObject.signedCallBack != null) {
        ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
      } else {
        return signature;
      }
    } catch (err) {
      alert("签名失败。错误原因：" + err.message + ", 请联系客服。");
      ukeySenceSignObject.signature = "签名失败";
      ukeySenceSignObject.ukeyNo = "";
      ukeySenceSignObject.isSuccess = false;
      ukeySenceSignObject.ukeyObject = "";

      if (ukeySenceSignObject.signedCallBack != null) {
        ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
      } else {
        return "签名失败";
      }
    }
  }

  /**
   * 获取签名策略
   */
  obtainTheSignatureRules() {
    var text =
      '{"G":"2|1|259|GM|1.2.156.10197.1.401","H":"2|1|259|GM|1.2.156.10197.1.401","I":"2|1|259|GM|1.2.156.10197.1.401","J":"0|3|257|GR|1.3.14.3.2.26","K":"0|0|260|GS|1.19.30.19.18.42"}';
    signatureRules = text;
  }

  /**
   * 获取网银盾序列号方法
   */
  getUkeySN() {
    var ukeySnResult = "";
    var ukeyProduct = new Array("11", "21", "31", "41", "51");
    for (var i = 0; i < ukeyProduct.length; i++) {
      this.createObject(ukeyProduct[i]);
      try {
        var wdk = document.getElementById("wdk");
        var s = wdk.GetMediaID;
        if (
          ukeyProduct[i] &&
          typeof s != "undefined" &&
          // eslint-disable-next-line valid-typeof
          typeof s != "unknown"
        ) {
          var sn = Sys.ie ? wdk.GetMediaID : wdk.GetMediaID();
          // eslint-disable-next-line valid-typeof
          if (sn != "" && typeof sn != "undefined" && typeof sn != "unknown") {
            ukeySnResult = ukeySnResult + sn + "|";
            break;
          }
        }
      } catch (e) {
        return "-2";
      }
    }
    if (ukeySnResult.length > 1) {
      ukeySnResult = ukeySnResult.substring(0, ukeySnResult.length - 1);
    }
    return ukeySnResult;
  }
  /**
   * 网银盾签名
   */
  ccbcaSign(original) {
    if (this.isECCkey(signatureRules)) {
      this.createECCSignObject(); //创建国密盾签名控件
      return this.SignData(original, signatureRules);
    } else {
      this.createSignObject(); //创建存量盾签名控件
      return this.DetachedSign(original);
    }
  }
  /**
   * 创建获取序列号控件对象
   */
  createObject(obj) {
    var isExitDiv = true;
    var ccbcaDiv = document.getElementById("ccbcadiv");
    if (ccbcaDiv == null) {
      isExitDiv = false;
      ccbcaDiv = document.createElement("ccbcadiv");
    }
    ccbcaDiv.style.height = 0;
    ccbcaDiv.style.width = 0;
    ccbcaDiv.style.overflow = "hidden";
    if (obj == "11") {
      if (Sys.ie) {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" CLASSID="CLSID:CE0460F5-48BD-4DC1-A046-0BDCB5A06CEB" height=0 width=0></OBJECT>';
      } else {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" type="application/x-watchdata-usbkey-ctrl" width=0 height=0 />';
      }
    } else if (obj == "21") {
      if (Sys.ie) {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" CLASSID="CLSID:391E41FF-1CE1-493F-9B34-8BC53FB76A86" height=0 width=0></OBJECT>';
      } else {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" type="application/mozilla-hdzb-ccbsnctrl-plugin" width=0 height=0/>';
      }
    } else if (obj == "31") {
      if (Sys.ie) {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" CLASSID="CLSID:128EEE5A-A2FD-4DDC-AFAD-8B03DA1CA18F" height=0 width=0></OBJECT>';
      } else {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" type="application/mozilla-dmwz-ccbdevidctrl-plugin" width=0 height=0/>';
      }
    } else if (obj == "41") {
      if (Sys.ie) {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" CLASSID="CLSID:48A7113A-2B2E-4ED3-9B26-5C21FABEB217" height=0 width=0></OBJECT>';
      } else {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" type="application/x-tendyron-ccb-usbkey-ctrl" width=0 height=0/>';
      }
    } else if (obj == "51") {
      if (Sys.ie) {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" CLASSID="CLSID:391E41FF-1CE1-493F-9B34-8BC53FB7914C" height=0 width=0></OBJECT>';
      } else {
        ccbcaDiv.innerHTML =
          '<OBJECT id="wdk" type="application/mozilla-hdzb-2g-ccbsnctrl-plugin" width=0 height=0/>';
      }
    }
    if (!isExitDiv) {
      document.body.appendChild(ccbcaDiv);
    }
  }
  /**
   * 根据网银盾序列号判断UKEY类型
   */
  isECCkey(rule) {
    var flag = "";
    try {
      rule = JSON.parse(rule);
    } catch (e) {
      alert("国密盾签名规则查询失败");
      return;
    }
    ukeySn = this.getUkeySN();
    var length = ukeySn.length;
    var result = ukeySn.substr(2, 1);
    if (length == 12 && rule[result] !== undefined) {
      flag = true; //国密盾
    } else {
      flag = false; //存量盾
    }
    return flag;
  }

  /**
   * 国密盾签名方法
   */
  SignData(original, rule) {
    var signature = "";
    try {
      rule = JSON.parse(rule);
    } catch (e) {
      alert("国密盾签名规则查询失败");
      return;
    }
    if (ukeySn) {
      if (original) {
        var UKeySNChar = ukeySn.substr(2, 1);
        var ruleStr = rule[UKeySNChar];
        if (ruleStr == undefined) {
          alert("签名失败");
          return;
        }
        var ruleArr = ruleStr.split("|");
        if (ruleArr && ruleArr.length >= 3) {
          signature = CCB_GMSignCtl.CryptSign(
            ukeySn,
            Number(ruleArr[0]),
            Number(ruleArr[1]),
            ruleArr[2],
            original
          );
        } else {
          alert("签名失败");
          return;
        }
        var errNum = CCB_GMSignCtl.errorNum;
        if (errNum != 0) {
          alert("签名失败:" + errNum);
        }
      } else {
        alert("输入为空");
      }
    } else {
      alert("请获取网银盾序列号");
    }
    return signature;
  }
  /**
   * 存量盾签名方法
   */
  DetachedSign(original) {
    var signature = "";
    if (original) {
      try {
        signature = CCB_GMSignCtl.DetachedSign(original, "O=CCB");
        var errNum = CCB_GMSignCtl.errorNum;
        if (errNum != 0) {
          alert("签名失败:" + errNum);
        }
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("签名原文不能为空");
    }
    return signature;
  }
  /**
   * 创建国密盾签名控件对象
   */
  createECCSignObject() {
    var ccbcaCT = document.createElement("ccbcact");
    ccbcaCT.style.height = 0;
    ccbcaCT.style.width = 0;
    ccbcaCT.style.overflow = "hidden";
    if (Sys.ie) {
      ccbcaCT.innerHTML =
        '<OBJECT ID="CCB_GMSignCtl" CLASSID="CLSID:7F432EA4-52B9-442C-AFBD-E1A73AD87043" CODEBASE="CCB_GMSignCom.dll #version=1,0,0,1" width="0" height="0"></OBJECT>';
    } else {
      ccbcaCT.innerHTML =
        '<div id="divSign"><embed id="CCB_GMSignCtl" type="application/mozilla-ccbgmsignctrl-plugin" width=400 height=30></div>';
    }
    document.body.appendChild(ccbcaCT);
    CCB_GMSignCtl = document.getElementById("CCB_GMSignCtl");
  }
  /**
   * 创建存量盾签名控件对象
   */
  createSignObject() {
    var ccbcaCT = document.createElement("ccbcact");
    ccbcaCT.style.height = 0;
    ccbcaCT.style.width = 0;
    ccbcaCT.style.overflow = "hidden";
    if (Sys.ie) {
      ccbcaCT.innerHTML =
        '<OBJECT id="CCBNetSign" classid="clsid:BBA27CAD-B01E-49D2-A157-D6A0B411279F" height=0 width=0></OBJECT>';
    } else {
      ccbcaCT.innerHTML =
        '<div id="P_CCBNetSign"><OBJECT type="application/mozilla-ccbnetsign-plugin" width=0 height=0></OBJECT></div>';
    }
    document.body.appendChild(ccbcaCT);
    CCB_GMSignCtl = document.getElementById("CCBNetSign");
  }

  /**
   * 工程航信平台添加该方法
   * 获取Ukey参数,ukey序列号及ukey颁发者
   */
  getUkeyParams(bankUkeyParamsObject) {
    let params = {};
    let serialNo = this.getSerialNumber(bankUkeyParamsObject);
    if (serialNo.indexOf("证书没有准备好") != -1 || serialNo == "") {
      alert("请重新插入建行UKEY，如有疑问请联系客服！");
      return false;
    }
    params.serialNo = serialNo;
    params.issureDn = "CCBCA";
    params.algorithmType = this.getUkeyAlgorithmType();
    params.caIssuer = "RA_CCB";
    return params;
  }
  //获取加密算法
  getUkeyAlgorithmType() {
    if (true == this.isECCkey(signatureRules)) {
      return "ALG_SM2";
    } else {
      return "ALG_RSA";
    }
  }
}