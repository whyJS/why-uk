var ccbUkeyAction = function() {
  //CCBCA控件
  var CCB_GMSignCtl;
  //签名策略
  var signatureRules;
  //ukey编号
  var ukeySn;
  //浏览器类型
  var Sys = {};

  function isHasAttr(obj, attr) {
    //判断是否有该键值
    if (obj && obj.hasOwnProperty(attr)) {
      //如果有返回true
      return true;
    }
    return false;
  }
  this.init = function() {
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/(msie\s|trident.*rv:)([\w.]+)/))
      ? (Sys.ie = s[2] || "0")
      : (s = ua.match(/firefox\/([\d.]+)/))
      ? (Sys.firefox = s[1])
      : (s = ua.match(/chrome\/([\d.]+)/))
      ? (Sys.chrome = s[1])
      : (s = ua.match(/opera.([\d.]+)/))
      ? (Sys.opera = s[1])
      : (s = ua.match(/version\/([\d.]+).*safari/))
      ? (Sys.safari = s[1])
      : 0;
    obtainTheSignatureRules();
  };

  //获取证书序列号(供页面调用)
  this.getSerialNumber = function(bankUkeyParamsObject) {
    var result = {};
    var params = {};
    try {
      var info = getUkeySN();
      if (!info || typeof info == "undefined" || typeof info == "unknown") {
        bankUkeyParamsObject.serialNo = "";
        //alert("请重新插入建行UKEY，如有疑问请联系客服！");
        return "";
      }

      if (info == "-2") {
        bankUkeyParamsObject.serialNo = "";
        //alert("请重新插入建行UKEY，如有疑问请联系客服！");
        return "";
      }
      bankUkeyParamsObject.serialNo = info;
      params.serialNo = info;
      params.issureDn = "CCBCA";
      params.eventCode = bankUkeyParamsObject.eventCode;
      var algorithmType = this.getUkeyAlgorithmType();
      params.algorithmType = algorithmType;
      params.caIssuer = "RA_CCB";
      var json = JSON.stringify(params);
      json = encodeURIComponent(json);
      bankUkeyParamsObject.ukeyObject = json;
      bankUkeyParamsObject.issureDn = "CCBCA";
      bankUkeyParamsObject.algorithmType = algorithmType;
      bankUkeyParamsObject.caIssuer = "RA_CCB";
      return info;
    } catch (e) {
      alert("获取序列号失败");
      return "";
    }
  };

  //证书签名(供页面调用)
  this.sign = function(ukeySenceSignObject) {
    ukeySenceSignObject.isDirectCall = true;
    var original = ukeySenceSignObject.signedOriginal;
    var result = {};
    var params = {};
    try {
      if (
        !original ||
        original == "" ||
        typeof original == "undefined" ||
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
      var signature = ccbcaSign(original);

      if (
        !signature ||
        typeof signature == "undefined" ||
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
      ukeySenceSignObject.ukeyNo = getUkeySN();
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
      if (isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (isHasAttr(ukeySenceSignObject.callBackParams, "params")) {
          ukeySenceSignObject.callBackParams.params.issureDn = params.issureDn;
        }
      }
      if (isHasAttr(ukeySenceSignObject, "callBackParams")) {
        if (isHasAttr(ukeySenceSignObject.callBackParams, "ukeyParams")) {
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
  };

  /**
   * 获取签名策略
   */
  function obtainTheSignatureRules() {
    var text =
      '{"G":"2|1|259|GM|1.2.156.10197.1.401","H":"2|1|259|GM|1.2.156.10197.1.401","I":"2|1|259|GM|1.2.156.10197.1.401","J":"0|3|257|GR|1.3.14.3.2.26","K":"0|0|260|GS|1.19.30.19.18.42"}';
    signatureRules = text;
  }

  /**
   * 获取网银盾序列号方法
   */
  function getUkeySN() {
    var ukeySnResult = "";
    var ukeyProduct = new Array("11", "21", "31", "41", "51");
    for (var i = 0; i < ukeyProduct.length; i++) {
      createObject(ukeyProduct[i]);
      try {
        var wdk = document.getElementById("wdk");
        var s = wdk.GetMediaID;
        if (
          ukeyProduct[i] &&
          typeof s != "undefined" &&
          typeof s != "unknown"
        ) {
          var sn = Sys.ie ? wdk.GetMediaID : wdk.GetMediaID();
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
  function ccbcaSign(original) {
    if (isECCkey(signatureRules)) {
      createECCSignObject(); //创建国密盾签名控件
      return SignData(original, signatureRules);
    } else {
      createSignObject(); //创建存量盾签名控件
      return DetachedSign(original);
    }
  }
  /**
   * 创建获取序列号控件对象
   */
  function createObject(obj) {
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
  function isECCkey(rule) {
    var flag = "";
    try {
      rule = JSON.parse(rule);
    } catch (e) {
      alert("国密盾签名规则查询失败");
      return;
    }
    ukeySn = getUkeySN();
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
  function SignData(original, rule) {
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
  function DetachedSign(original) {
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
  function createECCSignObject() {
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
  function createSignObject() {
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
  (this.getUkeyParams = function(bankUkeyParamsObject) {
    var params = {};
    var serialNo = this.getSerialNumber(bankUkeyParamsObject);
    if (serialNo.indexOf("证书没有准备好") != -1 || serialNo == "") {
      alert("请重新插入建行UKEY，如有疑问请联系客服！");
      return false;
    }
    params.serialNo = serialNo;
    params.issureDn = "CCBCA";
    var algorithmType = this.getUkeyAlgorithmType();
    params.algorithmType = algorithmType;
    params.caIssuer = "RA_CCB";
    bankUkeyParamsObject.serialNo = serialNo;
    var json = JSON.stringify(params);
    json = encodeURIComponent(json);
    bankUkeyParamsObject.ukeyObject = json;
    bankUkeyParamsObject.issureDn = "CCBCA";
    bankUkeyParamsObject.algorithmType = algorithmType;
    bankUkeyParamsObject.caIssuer = "RA_CCB";

    return params;
  }),
    //获取加密算法
    (this.getUkeyAlgorithmType = function() {
      if (true == isECCkey(signatureRules)) {
        return "ALG_SM2";
      } else {
        return "ALG_RSA";
      }
    });
};
/**
 * ukey相关继承操作
 */
var CcbUkey = BaseUkey.extend({
  init: function() {
    this.ukeyAction = new ccbUkeyAction();
    this.ukeyAction.init();
  },
  getSerialNumber: function(bankUkeyParamsObject) {
    return this.ukeyAction.getSerialNumber(bankUkeyParamsObject);
  },
  sign: function(ukeySenceSignObject) {
    return this.ukeyAction.sign(ukeySenceSignObject);
  },
  getUkeyParams: function(bankUkeyParamsObject) {
    return this.ukeyAction.getUkeyParams(bankUkeyParamsObject);
  }
});
