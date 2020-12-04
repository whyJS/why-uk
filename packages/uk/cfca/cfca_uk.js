/*
 * @Descripttion:CFCA UK类
 * @Author: whyjs
 * @Date: 2020-12-02 17:31:27
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-04 16:40:50
 */
import BaseUkey from '../base/base_uk.js'
import $ from 'jquery'
var Confirm = require('web-confirm');


export default class CfcaUkey extends BaseUkey {
  constructor() {
    super()
    // this.init()
  }
  //获取证书序列号(供页面调用)
  getSerialNumber(bankUkeyParamsObject) {
    try {
      var cryptoAgent = this.ukeyInitCryptoAgent();
      if (!cryptoAgent) {
        var flag = this.downLoad();
        if (flag == false) {
          return "";
        }
      }
      var params = this.getUkeySN(cryptoAgent);
      var issuerDn = params.issuerDn;
      issuerDn = issuerDn.toUpperCase();
      if (!issuerDn.match("CFCA")) {
        alert("您选择的UKEY证书与对应的银行机构不匹配,请重新选择。如有疑问请联系客服。");
        return "获取序列号失败";
      }

      if (params.serialNo) {
        bankUkeyParamsObject.serialNo = params.serialNo;
        params.eventCode = bankUkeyParamsObject.eventCode;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json)
        bankUkeyParamsObject.ukeyObject = json;
        bankUkeyParamsObject.issureDn = params.issuerDn;
        return params.serialNo;
      } else {
        bankUkeyParamsObject.serialNo = "";
        bankUkeyParamsObject.ukeyObject = "";
        bankUkeyParamsObject.issureDn = "";
      }
      return "获取序列号失败";
    } catch (e) {
      alert("请重新插入UKEY，如有疑问请联系客服！");
      return "获取序列号失败";
    }
  }

  //证书签名(供页面调用)
  sign(ukeySenceSignObject) {
    // var result = {};
    var params = {};
    var original = ukeySenceSignObject.signedOriginal;
    try {
      if ((!original) || (original == "") ||
        (typeof original == "undefined") ||
        // eslint-disable-next-line valid-typeof
        (typeof original == "unknown")) {
        ukeySenceSignObject.signature = "签名失败";
        if (ukeySenceSignObject.signedCallBack != null) {
          ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
          return;
        } else {
          return "签名失败";
        }
      }
      var cryptoAgent = this.ukeyInitCryptoAgent();
      if (!cryptoAgent) {
        var flag = this.downLoad();
        if (flag == false) {
          return "";
        }
      }
      //获取ukey序列号
      var serialNo = this.getCertInfo('SerialNumber', cryptoAgent);

      params.serialNo = serialNo;
      //获取ukey颁发者
      params.issuerDn = this.getCertInfo('IssuerDn', cryptoAgent);
      var issuerDn = params.issuerDn;
      issuerDn = issuerDn.toUpperCase();
      if (!issuerDn.match("CFCA")) {
        alert("您选择的UKEY证书与对应的银行机构不匹配,请重新选择。如有疑问请联系客服。");
        return "签名失败";
      }

      params.remark = this.getCertInfo('SubjectDN', cryptoAgent);
      params.subjectDN = this.getCertInfo('SubjectDN', cryptoAgent);
      params.subjectCN = this.getCertInfo('SubjectCN', cryptoAgent);
      params.cspName = this.getCertInfo('CSPName', cryptoAgent);
      params.eventCode = ukeySenceSignObject.eventCode;
      params.eventNode = ukeySenceSignObject.eventNode;
      //
      params.signedOriginal = ukeySenceSignObject.signedOriginal;
      var signature = this.cfcaSign(original, cryptoAgent);

      params.signature = signature;
      var json = JSON.stringify(params);
      json = encodeURIComponent(json);
      ukeySenceSignObject.ukeyObject = json;

      ukeySenceSignObject.signature = signature;
      ukeySenceSignObject.ukeyNo = serialNo;
      ukeySenceSignObject.isSuccess = true;
      if (super.isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (super.isHasAttr(ukeySenceSignObject.callBackParams, "params")) {
          ukeySenceSignObject.callBackParams.params.issureDn = params.issuerDn;
        }
      }
      if (super.isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (super.isHasAttr(ukeySenceSignObject.callBackParams, "ukeyParams")) {
          ukeySenceSignObject.callBackParams.ukeyParams.issureDn = params.issuerDn;
        }
      }

      if (ukeySenceSignObject.signedCallBack != null) {
        ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
      } else {
        return signature;
      }
    } catch (e) {
      alert('签名失败，请联系管理员！', 2);
      ukeySenceSignObject.signature = "签名失败";
      if (ukeySenceSignObject.signedCallBack != null) {
        ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
      } else {
        return "签名失败";
      }
    }
  }


  //获取Ukey参数,ukey序列号及ukey颁发者
  getUkeyParams(bankUkeyParamsObject) {
    var cryptoAgent = this.ukeyInitCryptoAgent();
    if (!cryptoAgent) {
      var flag = this.downLoad();
      if (flag == false) {
        return false;
      }
    }
    var params = {};
    //判断是否插入Ukey
    var test = this.selectCert('', '', '', cryptoAgent);
    var selectedCert = test;
    if (test != true && test.indexOf('证书库中没有可用的证书') != -1) {
      alert("请您插入Ukey！");
      bankUkeyParamsObject.serialNo = "";
      bankUkeyParamsObject.issureDn = "";
      return false;
    }
    //获取ukey序列号
    var serialNo = this.getCertInfo('SerialNumber', cryptoAgent);
    if (serialNo.indexOf('证书没有准备好') != -1) {
      alert("请您选择Ukey证书！");
      bankUkeyParamsObject.serialNo = "";
      bankUkeyParamsObject.issureDn = "";
      return false;
    }
    params.serialNo = serialNo;
    //获取ukey颁发者
    params.issuerDn = this.getCertInfo('IssuerDn', cryptoAgent);
    var issuerDn = params.issuerDn;
    issuerDn = issuerDn.toUpperCase();
    if (!issuerDn.match("CFCA")) {
      alert("您选择的UKEY证书与对应的银行机构不匹配,请重新选择。如有疑问请联系客服。");
      return false;
    }

    params.remark = this.getCertInfo('SubjectDN', cryptoAgent);
    params.subjectDN = this.getCertInfo('SubjectDN', cryptoAgent);
    params.subjectCN = this.getCertInfo('SubjectCN', cryptoAgent);
    params.cspName = this.getCertInfo('CSPName', cryptoAgent);
    params.certSN = this.getCertInfo('CertSN', cryptoAgent);

    params.eventCode = bankUkeyParamsObject.eventCode;
    params.eventNode = bankUkeyParamsObject.eventNode;
    bankUkeyParamsObject.serialNo = serialNo;
    bankUkeyParamsObject.issureDn = params.issuerDn;
    var json = JSON.stringify(params);
    json = encodeURIComponent(json)
    bankUkeyParamsObject.ukeyObject = json;
    params.selectedCert = selectedCert;
    return params;
  }

  //============================内置接口说明（共4个）========================================
  //SelectCertificate();通过传入的字符串作为DN的筛选条件，选择出符合DN条件的带私钥的RSA签名证书。
  // 如果筛选字符串为空，则对相应条件不进行筛选。仅选择已注册的RSA证书。
  //GetSignCertInfo();根据传入的标识，获得已选定证书（通过SelectCertificate选定的证书）的相关信息。
  //“SubjectDN”: 	证书主题DN；
  // “SubjectCN”: 		证书主题CN；
  // “SerialNumber”: 	证书序列号；
  // “CSPName”: 		证书对应的CSP名称；
  // “IssuerDN”：		颁发者DN。
  //SignMsgPKCS7();对字符串进行RSA签名，返回Base64编码的PKCS#7签名结果。
  // GetLastErrorDesc();获得最近一次调用接口导致发生错误的描述信息。此函数会根据不同的操作系统语言（简体中文/美国英语）来本地化错误描述。
  //===========================================================================================


  //初始化 Ukey 内置JS函数的对象
  ukeyInitCryptoAgent() {
    var CryptoAgent;
    try {
      var eDiv = document.createElement("div");
      eDiv.style.display = 'none';
      if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
        if (window.navigator.cpuClass == "x86") {
          eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.eavic.x86.cab\" classid=\"clsid:CD5A005D-5771-4B17-9ABC-68F38B6D4D6F\" ></object>";
        } else {
          eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.eavic.x64.cab\" classid=\"clsid:C4AAC63A-02DB-4ABE-BC5D-CFA1279B8115\" ></object>";
        }
      } else {
        eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.CCBTRUST.x86\" style=\"height: 0px; width: 0px\">";

      }
      document.body.appendChild(eDiv);
      CryptoAgent = document.getElementById('CryptoAgent');
      console.log('GetLastErrorDesc')
      CryptoAgent.GetLastErrorDesc();
      console.log('GetLastErrorDesc,.....')
      return CryptoAgent;
    } catch (e) {
      return false;
    }
  }

  //选择证书,主要用来判断是否插入Ukey
  selectCert(subjectDNFilter, issuerDNFilter, serialNumFilter, CryptoAgent) {
    var message; //返回错误信息
    try {
      var selectCert = CryptoAgent.SelectCertificate(subjectDNFilter, issuerDNFilter, serialNumFilter);
      if (!selectCert) {
        //throw CryptoAgent.GetLastErrorDesc();
        message = CryptoAgent.GetLastErrorDesc();
      }
      return selectCert;
    } catch (e) {
      if (typeof e == 'string') {
        throw e;
      } else {
        message = CryptoAgent.GetLastErrorDesc();
      }
    }
    return message;
  }

  //获取序列号等相关信息 --SubjectDN, SubjectCN, SerialNumber, CSPName, CertType, IssuerDN
  getCertInfo(infoType, CryptoAgent) {
    var message; //返回错误信息
    try {
      var info = CryptoAgent.GetSignCertInfo(infoType);
      if (!info) {
        message = CryptoAgent.GetLastErrorDesc();
        return message;
      }
      return info;
    } catch (e) {
      if (typeof e == 'string') {
        throw e;
      } else {
        message = CryptoAgent.GetLastErrorDesc();
      }
    }
    return message;
  }

  //前端加密
  cfcaSign(original, CryptoAgent) {
    var errBool = false;
    //异常处理
    var exception;
    // 签名Hash算法 SHA-1
    try {
      return this.cfcaSHA1Sign(original, CryptoAgent);
    } catch (ex) {
      errBool = true;
      exception = ex;
    }
    // 签名Hash算法 MD5
    try {
      return this.cfcaMD5Sign(original, CryptoAgent);
    } catch (ex) {
      errBool = true;
      exception = ex;
    }

    //签名Hash算法 SHA256
    try {
      return this.cfcaSHA256Sign(original, CryptoAgent);
    } catch (ex) {
      errBool = true;
      exception = ex;
    }

    if (errBool) {
      if (typeof exception == 'string') {
        throw exception;
      } else {
        var message = CryptoAgent.GetLastErrorDesc();
        throw message.indexOf('0x00000000') == -1 ? message : (exception.number + '\n' + exception.message);
      }
    }

  }
  /**
   * 签名Hash算法 SHA-1
   */
  cfcaSHA1Sign(original, CryptoAgent) {
    try {
      var hashAlg = 'SHA-1';
      var signature = CryptoAgent.SignMsgPKCS7(original, hashAlg, true);
      if (!signature) {
        throw CryptoAgent.GetLastErrorDesc();
      }
      return signature;
    } catch (e) {
      if (typeof e == 'string') {
        throw e;
      } else {
        var message = CryptoAgent.GetLastErrorDesc();
        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
      }
    }
  }
  /**
   * 签名Hash算法 SHA-256
   */
  cfcaSHA256Sign(original, CryptoAgent) {
    try {
      var hashAlg = 'SHA-256';
      var signature = CryptoAgent.SignMsgPKCS7(original, hashAlg, true);
      if (!signature) {
        throw CryptoAgent.GetLastErrorDesc();
      }
      return signature;
    } catch (e) {
      if (typeof e == 'string') {
        throw e;
      } else {
        var message = CryptoAgent.GetLastErrorDesc();
        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
      }
    }
  }
  /**
   * 签名Hash算法 MD-5
   */
  cfcaMD5Sign(original, CryptoAgent) {
    try {
      var hashAlg = 'MD-5';
      var signature = CryptoAgent.SignMsgPKCS7(original, hashAlg, true);
      if (!signature) {
        throw CryptoAgent.GetLastErrorDesc();
      }
      return signature;
    } catch (e) {
      if (typeof e == 'string') {
        throw e;
      } else {
        var message = CryptoAgent.GetLastErrorDesc();
        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
      }
    }
  }


  //前端下载证书控件
  downLoad() {
    if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
      //20180726-STA-修改下载证书控件
      var cfca_title = " UKey操作提示"
      var cfca_message = "请下载安装证书控件，安装完成后请重启浏览器！"
      var bootbox = new Confirm(cfca_title, cfca_message, ['确定', "取消"], [function () {
        this.downloadFile('/rest/upload/v2/downUkey');
        bootbox.hide();
      }, function () {
        console.log('点击取消的回调');
        bootbox.hide();
      }]);
      //调用show()方法
      bootbox.show();
      //window.open(context+'/static/script/ukey/CryptoKit.eavic.exe');
    } else {
      alert("为保证系统正常使用，请使用Windows7及以上操作系统和IE10版本及以上的浏览器进行访问!");
    }
    return false;
  }


  //获取Ukey参数,ukey序列号及ukey颁发者,签章专用的方法
  getUkeySN(cryptoAgent) {
    var params = {};
    //判断是否插入Ukey
    var test = this.selectCert('', '', '', cryptoAgent);
    if (test != true && test.indexOf('证书库中没有可用的证书') != -1) {
      alert("请您插入Ukey！");
      return false;
    }
    //获取ukey序列号
    var serialNo = this.getCertInfo('SerialNumber', cryptoAgent);
    if (serialNo.indexOf('证书没有准备好') != -1) {
      alert("请您选择Ukey证书！");
      return false;
    }
    params.serialNo = serialNo;
    //获取ukey颁发者
    params.issuerDn = this.getCertInfo('IssuerDn', cryptoAgent);
    params.remark = this.getCertInfo('SubjectDN', cryptoAgent);
    params.subjectDN = this.getCertInfo('SubjectDN', cryptoAgent);
    params.subjectCN = this.getCertInfo('SubjectCN', cryptoAgent);
    params.cspName = this.getCertInfo('CSPName', cryptoAgent);
    params.certSN = this.getCertInfo('CertSN', cryptoAgent);
    return params;
  }


  //20180726-STA-修改下载证书控件
  downloadFile(url) {
    console.log(url)
    //定义一个form表单,通过form表单来发送请求
    var form = $("<form>");
    // //设置表单状态为不显示
    form.attr("style", "display:none");

    // //method属性设置请求类型为post
    form.attr("method", "post");

    // //action属性设置请求路径,
    // //请求类型是post时,路径后面跟参数的方式不可用
    // //可以通过表单中的input来传递参数
    form.attr("action", url);
    $("body").append(form); //将表单放置在web中
    form.submit(); //表单提交
  }
  //20180726-END-修改下载证书控件
}