var IcbcUkeyAction = function () {
  var newwin = null;
  var url = null;
  var signForm = null;
  var _ukeySenceSignObject = null;
  //默认认证列表
  //var certArray = ["0","1","3"];
  var certArray = ["0", "1"];
  var index = "";
  var signModel = "0";
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  function getUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxaxxxxb4xxxcyxxxdxxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  function isHasAttr(obj, attr) {
    //判断是否有该键值
    if (obj && obj.hasOwnProperty(attr)) {
      //如果有返回true
      return true;
    }
    return false;
  }
  function boxAlert(message) {
    window.eleAlert(
      message,
      "信息提示",
      function () { },
      function () { }
    );
    // bootbox.alert({
    //   buttons: {
    //     ok: {
    //       label: "关闭",
    //       className: "hxbtn orange"
    //     }
    //   },
    //   closeButton: false,
    //   message: message,
    //   title: "信息提示"
    // });
  }
  function getSignForm() {
    $.ajax({
      url: window.HXUKURL + '/icbcukey/sign/buildform',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          window.headerAxios().Authorization
        );
        xhr.setRequestHeader("GoldNet-Auth", window.headerAxios().GoldNetAuth);
      },
      data: { "signObject": JSON.stringify(_ukeySenceSignObject.signObject) },
      type: "POST",
      async: false,
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        var date = new Date();
        var target = date.toLocaleString();
        newwin = window.open("", target);
        newwin.opener.document.write(data);
      },
      error: function (data) {
        var date = new Date();
        var target = date.toLocaleString();
        newwin = window.open("", target);
        newwin.opener.document.write(data);
        return;
      }
    });
  }
  function openSignForm(ukeySenceSignObject) {
    var date = new Date();
    var target = getUUID();
    var url = "";

    var params = {};

    params.SignNatureForm = "execute009BuildForm";
    if (isHasAttr(ukeySenceSignObject, "bizCode")) {
      params.bizCode = ukeySenceSignObject.bizCode;
    } else {
      params.bizCode = "--";
    }

    if (isHasAttr(ukeySenceSignObject, "bankCode")) {
      params.bankCode = ukeySenceSignObject.bankCode;
    } else {
      params.bankCode = "--";
    }
    //银行相关信息参数
    if (isHasAttr(ukeySenceSignObject, "bankInterfaceParams")) {
      params.bankInterfaceParams = ukeySenceSignObject.bankInterfaceParams;
    } else {
      params.bankInterfaceParams = "";
    }

    var paramJson = JSON.stringify(params);
    paramJson = encodeURIComponent(paramJson);
    if (!isHasAttr(_ukeySenceSignObject, "signObject")) {
      var signObject = {};
      _ukeySenceSignObject.signObject = signObject;
    }
    if (!isHasAttr(_ukeySenceSignObject.signObject, "signedOriginal")) {
      _ukeySenceSignObject.signObject.signedOriginal =
        _ukeySenceSignObject.signedOriginal;
    }

    _ukeySenceSignObject.signObject.eventCode = _ukeySenceSignObject.eventCode;
    _ukeySenceSignObject.signObject.eventNode = _ukeySenceSignObject.eventNode;
    _ukeySenceSignObject.signObject.uuid = generateUUID();
    _ukeySenceSignObject.signObject.BankInterfaceInfo = paramJson;
    //工商银行的相关签名模式 户名+账号
    _ukeySenceSignObject.signObject.signModel = signModel;

    $.ajax({
      url: window.HXUKURL + '/icbcukey/sign/buildform',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          window.headerAxios().Authorization
        );
        xhr.setRequestHeader("GoldNet-Auth", window.headerAxios().GoldNetAuth);
      },
      data: { "signObject": JSON.stringify(_ukeySenceSignObject.signObject) },
      type: "POST",
      async: false,
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      success: function (win) {

        newwin = window.open('', target);
        newwin.document.write('<meta charset="UTF-8">')
        newwin.document.write(win.data)
      },
      error: function () {
        return;
      }
    });

  }

  function openwindows(ukeySenceSignObject) {
    openSignForm(ukeySenceSignObject);
    var w_title = "";
    var w_message = "";
    var w_message01 = "";
    var w_cancel = "";
    var w_finish = "";
    var w_c_message = "";
    w_cancel = "取消";
    w_finish = "确定";
    if ("00" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行绑定ukey实名认证提示";
      w_message =
        '绑定Ukey需要跳转至中国工商银行页面并完成绑定操作，完成绑定后请点击"确定"按钮，如有疑问请联系客服。';
      w_c_message =
        "请在已打开的中国工商银行网站完成实名认证绑定，重新绑定请先关闭工商银行页面。";
    }

    if ("31" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信开立提示";
      w_message =
        '【工程航信开立】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }
    if ("32" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信接收提示";
      w_message =
        '【工程航信接收】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }

    if ("33" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信流转提示";
      w_message =
        '【工程航信流转】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }

    if ("34" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信拒收提示";
      w_message =
        '【工程航信拒收】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }
    if ("35" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信撤回提示";
      w_message =
        '【工程航信撤回】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }
    if ("37" == ukeySenceSignObject.eventCode) {
      w_title = "中国工商银行工程航信融资提示";
      w_message =
        '【工程航信融资】需要跳转至中国工商银行页面并针对内容做签名处理,完成签名后请点击"确定"按钮，如有疑问请联系客服。';
      w_message01 =
        "【重要提示】根据工行验签方式调整为通过工行账号作为验证信息，如已通过实名认证，且无法使用工行ukey做业务的用户，<br>请在【企业管理】-【企业银行账户】里修改工商银行实名账户信息，修改为工商银行正常账户即可做业务。";
      w_c_message =
        "请在已打开的中国工商银行网站完成业务内容签名，重新绑定请先关闭工商银行页面。";
    }
    if (w_message01 == "") {
    } else {
      w_message = w_message + "!!!!!" + w_message01;
    }

    window.eleAlert(
      w_message,
      w_title,
      function () {
        if (!newwin) {
          return true;
        }
        if (newwin.closed) {
          procSuccSignedNature();
          return true;
        } else {
          alert(w_c_message);
          newwin.close();
          procSuccSignedNature();
          return true;
        }
      },
      function () {
        if (!newwin) {
          return true;
        }
        if (newwin.closed) {
          procSuccSignedNature();
          return true;
        } else {
          alert(w_c_message);
          newwin.close();
          procSuccSignedNature();
          return true;
        }
      }
    );


  }
  function procSuccSignedNature() {
    var uuid = _ukeySenceSignObject.signObject.uuid;
    var signParams = {};
    signParams.SignNatureForm = "execute009SignNature";

    var signParamsJson = JSON.stringify(signParams);
    signParamsJson = encodeURIComponent(signParamsJson);
    var param = {
      uuid: uuid,
      bankInterfaceInfo: signParamsJson,
      eventCode: _ukeySenceSignObject.eventCode,
      eventNode: _ukeySenceSignObject.eventNode
    };
    htmlobj = $.ajax({
      url: window.HXUKURL + '/icbcukey/sign/signature',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          window.headerAxios().Authorization
        );
        xhr.setRequestHeader("GoldNet-Auth", window.headerAxios().GoldNetAuth);
      },
      data: { "signObject": JSON.stringify(param) },
      type: "POST",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      async: false,
      success: function (dataAll) {
        if (isHasAttr(dataAll, "code")) {
          if (dataAll.code == 200) {
            var data = dataAll.data
            _ukeySenceSignObject.signature = data.signature;
            //签名原文内容
            _ukeySenceSignObject.ukeyNo = data.ukeyNo;
            _ukeySenceSignObject.isSuccess = true;
            var params = {};
            params.serialNo = data.ukeyNo;
            params.issureDn = "ICBC";
            params.uuid = uuid;
            params.SignNatureForm = "execute009VeritySign";
            params.eventCode = _ukeySenceSignObject.eventCode;
            params.eventNode = _ukeySenceSignObject.eventNode;
            var json = JSON.stringify(params);

            if (isHasAttr(_ukeySenceSignObject, "callBackParams")) {
              if (isHasAttr(_ukeySenceSignObject.callBackParams, "params")) {
                _ukeySenceSignObject.callBackParams.params.issureDn = "ICBC";
              }
            }
            if (isHasAttr(_ukeySenceSignObject, "callBackParams")) {
              if (isHasAttr(_ukeySenceSignObject.callBackParams, "ukeyParams")) {
                _ukeySenceSignObject.callBackParams.ukeyParams.issureDn = "ICBC";
              }
            }

            json = encodeURIComponent(json);
            _ukeySenceSignObject.ukeyObject = json;
            _ukeySenceSignObject.issureDn = "ICBC";
            //工行增加保存签名模式
            _ukeySenceSignObject.identModel = signModel;
            //更新当前系统认证模式//不是实名的时候更新
            if ("00" != _ukeySenceSignObject.eventCode) {
              updateIdentModel();
            }
          } else {
            //移除数组
            /*certArray = certArray.filter(function(item) {
                return item != signModel
              });*/
            certArray = removeArray();
            //console.log("certArray:"+certArray);
            if (certArray.length != 0) {
              icbcChangeIdent();
              return false;
            }
            alert(data.errMsg);
            _ukeySenceSignObject.signature = "签名失败";
            _ukeySenceSignObject.signECOriginal = "";
            _ukeySenceSignObject.ukeyNo = "";
            _ukeySenceSignObject.isSuccess = false;
            var params = {};
            params.serialNo = "";
            params.issureDn = "ICBC";
            params.uuid = uuid;
            var json = JSON.stringify(params);
            json = encodeURIComponent(json);
            _ukeySenceSignObject.ukeyObject = json;
            _ukeySenceSignObject.issureDn = "ICBC";
          }
          _ukeySenceSignObject.signedCallBack(_ukeySenceSignObject);
          return;
        } else {
          //移除数组
          /*certArray = certArray.filter(function(item) {
              return item != signModel
            });*/
          certArray = removeArray();
          //console.log("certArray:"+certArray);
          if (certArray.length != 0) {
            icbcChangeIdent();
            return false;
          }
          alert("签名失败");
          _ukeySenceSignObject.signature = "签名失败";
          _ukeySenceSignObject.signECOriginal = "";
          _ukeySenceSignObject.ukeyNo = "";
          _ukeySenceSignObject.isSuccess = false;
          var params = {};
          params.serialNo = "";
          params.issureDn = "ICBC";
          params.uuid = uuid;
          var json = JSON.stringify(params);
          json = encodeURIComponent(json);
          _ukeySenceSignObject.ukeyObject = json;
          _ukeySenceSignObject.issureDn = "ICBC";
          _ukeySenceSignObject.signedCallBack(_ukeySenceSignObject);
        }

      },
      error: function () {
        //移除数组
        /*certArray = certArray.filter(function(item) {
            return item != signModel
          });*/
        certArray = removeArray();
        //console.log("certArray:"+certArray);
        if (certArray.length != 0) {
          icbcChangeIdent();
          return false;
        }
        alert("签名失败");
        _ukeySenceSignObject.signature = "签名失败";
        _ukeySenceSignObject.signECOriginal = "";
        _ukeySenceSignObject.ukeyNo = "";
        _ukeySenceSignObject.isSuccess = false;
        var params = {};
        params.serialNo = "";
        params.issureDn = "ICBC";
        params.uuid = uuid;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json);
        _ukeySenceSignObject.ukeyObject = json;
        _ukeySenceSignObject.issureDn = "ICBC";
        _ukeySenceSignObject.signedCallBack(_ukeySenceSignObject);
      }
    });
    // var data = JSON.parse(htmlobj.responseText);

  }
  function removeArray() {
    for (var i = certArray.length - 1; i >= 0; i--) {
      if (certArray[i] == signModel) certArray.splice(i, 1);
    }
    return certArray;
  }
  //初始化时加载
  function getIdentModel() {
    //获取当前使用认证模式
    var aisinoUkeyCertVO = {
      enterpriseId: "",
      identModel: "",
      bankType: "18A230B2-C535-4473-9B37-F890B8D7EFF8",
      operType: "",
      identNode: ""
    };
    try {

      htmlobj = $.ajax({
        url: window.HXUKURL + '/icbcukey/getIdentModel',
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            window.headerAxios().Authorization
          );
          xhr.setRequestHeader(
            "GoldNet-Auth",
            window.headerAxios().GoldNetAuth
          );
        },
        data: { "signObject": JSON.stringify(aisinoUkeyCertVO) },
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        async: false
      });
      var data = JSON.parse(htmlobj.responseText).data;
      //console.log(data);
      if (data && typeof data != "undefined") {
        var identModel = data.identModel;
        if (identModel && typeof identModel != "undefined") {
          //获取到当前企业认证模式
          signModel = identModel;
          //console.log("signModel:"+signModel);
        }
      }
    } catch (e) { }
  }
  //初始化时加载
  function updateIdentModel() {
    //获取当前使用认证模式
    var aisinoUkeyCertVO = {
      enterpriseId: "",
      identModel: signModel,
      bankType: "18A230B2-C535-4473-9B37-F890B8D7EFF8",
      operType: "",
      identNode: ""
    };
    try {

      htmlobj = $.ajax({
        url: window.HXUKURL + '/icbcukey/updateIdentModel',
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            window.headerAxios().Authorization
          );
          xhr.setRequestHeader(
            "GoldNet-Auth",
            window.headerAxios().GoldNetAuth
          );
        },
        data: { "signObject": JSON.stringify(aisinoUkeyCertVO) },
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        async: true
      });
      var data = JSON.parse(htmlobj.responseText).data;
      //console.log(data);
    } catch (e) { }
  }
  //工行认证模式
  function icbcChangeIdent() {
    //设置认证模式为1 统一社会信用代码
    signModel = certArray[0];
    var w_title = "更换认证方式";
    var w_message =
      "发现您正在使用工行U盾进行验证出现问题，我们已为您更换验证方式，请重试";
    var w_cancel = "取消";
    var w_finish = "确定";
    window.eleAlert(
      w_message,
      w_title,
      function () {
        openwindows(_ukeySenceSignObject);
      },
      function () { }
    );
    // bootbox.dialog({
    //   message: w_message,
    //   title: w_title,
    //   closeButton: true,
    //   onEscape: function() {
    //     return true;
    //   },
    //   buttons: {
    //     OK: {
    //       label: w_finish,
    //       className: "hxbtn orange",
    //       callback: function() {
    //         openwindows(_ukeySenceSignObject);
    //         return true;
    //       }
    //     }
    //   }
    // });
  }
  //获取证书序列号(供页面调用)
  this.getSerialNumber = function (bankUkeyParamsObject) {
    if ("00" == bankUkeyParamsObject.eventCode) {
      bankUkeyParamsObject.serialNo = "";
      bankUkeyParamsObject.ukeyObject = "";
      bankUkeyParamsObject.issureDn = "ICBC";
      return "waiting";
    }
    bankUkeyParamsObject.serialNo = "";
    bankUkeyParamsObject.ukeyObject = "";
    bankUkeyParamsObject.issureDn = "ICBC";
    var params = {};
    params.eventCode = bankUkeyParamsObject.eventCode;
    params.issuerDn = "ICBC";
    params.serialNo = "";



    htmlobj = $.ajax({
      url: window.HXUKURL + '/icbcukey/icbcUkeyNo',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          window.headerAxios().Authorization
        );
        xhr.setRequestHeader("GoldNet-Auth", window.headerAxios().GoldNetAuth);
      },
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      async: false
    });
    var data = JSON.parse(htmlobj.responseText);
    if (isHasAttr(data, "used")) {
      if (data.used == true) {
        params.serialNo = data.ukeyNo;
      }
    }
    var json = JSON.stringify(params);
    json = encodeURIComponent(json);
    bankUkeyParamsObject.ukeyObject = json;
    return params.serialNo;
  };

  //证书签名(供页面调用)
  this.sign = function (ukeySenceSignObject) {
    _ukeySenceSignObject = ukeySenceSignObject;
    //如果不是绑key 和更换
    if ("00" != _ukeySenceSignObject.eventCode) {
      getIdentModel();
    }
    openwindows(ukeySenceSignObject);
  };
  //获取Ukey参数,ukey序列号及ukey颁发者
  this.getCfcaUkeyParams = function () {
    var params = {};
    params.issuerDn = "ICBC";
    params.serialNo = "";

    htmlobj = $.ajax({
      url: window.HXUKURL + '/icbcukey/icbcUkeyNo',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          window.headerAxios().Authorization
        );
        xhr.setRequestHeader("GoldNet-Auth", window.headerAxios().GoldNetAuth);
      },
      type: "POST",

      dataType: "json",
      contentType: "application/json",
      async: false
    });
    var data = JSON.parse(htmlobj.responseText);
    if (isHasAttr(data, "used")) {
      if (data.used == true) {
        params.serialNo = data.ukeyNo;
      }
    }
    return params;
  };
};
/**
 * ukey相关继承操作
 */
var IcbcUkey = BaseUkey.extend({
  init: function () {
    this.ukeyAction = new IcbcUkeyAction();
  },
  getSerialNumber: function (ukeySenceSignObject) {
    return this.ukeyAction.getSerialNumber(ukeySenceSignObject);
  },
  sign: function (ukeySenceSignObject) {
    return this.ukeyAction.sign(ukeySenceSignObject);
  },
  getUkeyParams: function () {
    return this.ukeyAction.getCfcaUkeyParams();
  }
});
