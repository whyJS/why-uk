var BOCUkeyAction = function(){
    this.isHasAttr = function (obj, attr) {
        //判断是否有该键值
        if (obj && obj.hasOwnProperty(attr)) {
            //如果有返回true
            return true;
        }
        return false;

    };
    //检查中行ukey是否可用
    this.getSerialNumber = function (bankUkeyParamsObject){
        try{
            var cryptoAgent = ukeyInitCryptoAgent();
            if (!cryptoAgent) {
                var flag = prompt();
                if (flag == false) {
                    return "";
                }
            }
            var test = selectCert('','', '', '',cryptoAgent);
            if(test!='0' && test.indexOf('证书库中没有可用的证书')!=-1){
                alert("请您插入Ukey！");
                return false;
            }
            var serialNo = cryptoAgent.GetCertCN();
            if(serialNo && bankUkeyParamsObject.eventCode != "00"){
                var param = {};
                var flag = false;
                param.serialNo = serialNo;
                $.ajax({
                    url: "/admin/api/acountUkey/v2/bocChangeSerialNo",
                    data: JSON.stringify(param),
                    type: "POST",
                    async: false,
                    contentType: 'application/json',
                    dataType: "json",
                    success: function (data) {
                        if(data.data.result!="success"){
                            alert(data.data.info);
                            flag = true;
                        }
                    }
                })
                if(flag){
                    return false; 
                }
            }
            
          //这个判定主要是在审核人首次登陆的时候进行签名的认证处理 
            if (isHasAttr(bankUkeyParamsObject, "eventNode")
            	&& isHasAttr(bankUkeyParamsObject, "bizCode"))  {
            	if(serialNo && bankUkeyParamsObject.eventCode == "00" 
                	&& bankUkeyParamsObject.eventNode == "004" 
                	&& bankUkeyParamsObject.bizCode == "biz001" ){
                    var param = {};
                    var flag = false;
                    param.serialNo = serialNo;
                    $.ajax({
                        url: "/admin/api/acountUkey/v2/bocChangeSerialNo",
                        data: JSON.stringify(param),
                        type: "POST",
                        async: false,
                        contentType: 'application/json',
                        dataType: "json",
                        success: function (data) {
                            if(data.data.result!="success"){
                                alert(data.data.info);
                                flag = true;
                            }
                        }
                    })
                    if(flag){
                        return false;
                    }
                }
            }
            bankUkeyParamsObject.serialNo = serialNo;
            bankUkeyParamsObject.issureDn = "BOC";
            return serialNo;
        }catch(e){
            alert("请重新插入UKEY，如有疑问请联系客服！");
            return "";
        }
    };

    //证书签名(供页面调用)
    this.sign = function(ukeySenceSignObject){

        var status = checkUkey(ukeySenceSignObject);
        if (status == false) {
            return "";
        }
        
        var params = {};
        var original = ukeySenceSignObject.signedOriginal;
        try{
            if ( (!original) || (original == "") ||
                (typeof original =="undefined") ||
                (typeof original == "unknown") ) {
                ukeySenceSignObject.signature = "签名失败";
                if (ukeySenceSignObject.signedCallBack != null) {
                    ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
                    return;
                } else {
                    return "签名失败";
                }
            }
            var cryptoAgent = ukeyInitCryptoAgent();
            if (!cryptoAgent) {
                var flag = prompt();
                if (flag == false) {
                    return "";
                }
            }
            //获取ukey序列号
            var serialNo = cryptoAgent.GetCertCN();

            params.serialNo = serialNo;
            params.eventCode = ukeySenceSignObject.eventCode;
            params.eventNode = ukeySenceSignObject.eventNode;
            params.corpName = ukeySenceSignObject.corpName;
            params.loginName = ukeySenceSignObject.loginName;
            params.organID = ukeySenceSignObject.socialCreditCode;
            params.signedOriginal = ukeySenceSignObject.signedOriginal;
            params.signAccount = $("#bankCode").val();
            params.registerMsgID = ukeySenceSignObject.registerMsgID;
            params.signAccount = ukeySenceSignObject.signAccount;
            params.socialCreditCode = ukeySenceSignObject.socialCreditCode;
            var signature = BOCSign(original,cryptoAgent);

            params.signature = signature;
            var json = JSON.stringify(params);
            json = encodeURIComponent(json);
            ukeySenceSignObject.ukeyObject = json;

            ukeySenceSignObject.signature = signature;
            ukeySenceSignObject.ukeyNo = serialNo;
            ukeySenceSignObject.isSuccess = true;
            if (isHasAttr(ukeySenceSignObject, "callBackParams")) {
                if (isHasAttr(ukeySenceSignObject.callBackParams, "params")) {
                    ukeySenceSignObject.callBackParams.params.issureDn = params.issuerDn;
                }
            }
            if (isHasAttr(ukeySenceSignObject, "callBackParams")) {
                if (isHasAttr(ukeySenceSignObject.callBackParams, "ukeyParams")) {
                    ukeySenceSignObject.callBackParams.ukeyParams.issureDn = params.issuerDn;
                }
            }

            if (ukeySenceSignObject.signedCallBack != null) {
                ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
            } else {
                return signature;
            }
        }catch(e){
            alert('签名失败，请联系管理员！',2);
            ukeySenceSignObject.signature = "签名失败";
            if (ukeySenceSignObject.signedCallBack != null) {
                ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
            } else {
                return "签名失败";
            }
        }
    };

    //获取Ukey参数,ukey序列号及ukey颁发者
    this.getBOCUkeyParams = function(bankUkeyParamsObject){

        var cryptoAgent = ukeyInitCryptoAgent();
        if (!cryptoAgent) {
            var flag = prompt();
            if (flag == false) {
                return "";
            }
        }

        var params = {};
        //判断是否插入Ukey
        var test = selectCert('','', '', '',cryptoAgent);
        var selectedCert = test;
        if(test!='0' && test.indexOf('证书库中没有可用的证书')!=-1){
            alert("请您插入Ukey！");
            bankUkeyParamsObject.serialNo="";
            bankUkeyParamsObject.issureDn="";
            return false;
        }
        //获取ukey序列号
        var serialNo = cryptoAgent.GetCertCN();

        if(serialNo && bankUkeyParamsObject.eventCode != "00"){
            var param = {};
            var flag = false;
            param.serialNo = serialNo;
            $.ajax({
                url: "/admin/api/acountUkey/v2/bocChangeSerialNo",
                data: JSON.stringify(param),
                type: "POST",
                async: false,
                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    if(data.data.result!="success"){
                        alert(data.data.info);
                        flag = true;
                    }
                }
            })
            if(flag){
                return false;
            }
        }
      //这个判定主要是在审核人首次登陆的时候进行签名的认证处理 
        if (isHasAttr(bankUkeyParamsObject, "eventNode")
        	&& isHasAttr(bankUkeyParamsObject, "bizCode"))  {
        	if(serialNo && bankUkeyParamsObject.eventCode == "00" 
            	&& bankUkeyParamsObject.eventNode == "004" 
            	&& bankUkeyParamsObject.bizCode == "biz001" ){
                var param = {};
                var flag = false;
                param.serialNo = serialNo;
                $.ajax({
                    url: "/admin/api/acountUkey/v2/bocChangeSerialNo",
                    data: JSON.stringify(param),
                    type: "POST",
                    async: false,
                    contentType: 'application/json',
                    dataType: "json",
                    success: function (data) {
                        if(data.data.result!="success"){
                            alert(data.data.info);
                            flag = true;
                        }
                    }
                })
                if(flag){
                    return false;
                }
            }
        }
        
        if(serialNo.indexOf('证书没有准备好')!=-1){
            alert("请您选择Ukey证书！");
            bankUkeyParamsObject.serialNo="";
            bankUkeyParamsObject.issureDn="";
            return false;
        }
        params.serialNo = serialNo;
        //获取ukey颁发者
        params.issuerDn = "BOC";

        params.eventCode=bankUkeyParamsObject.eventCode;
        params.eventNode=bankUkeyParamsObject.eventNode;
        bankUkeyParamsObject.serialNo = serialNo;
        bankUkeyParamsObject.issureDn = params.issuerDn;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json)
        bankUkeyParamsObject.ukeyObject = json;
        params.selectedCert = selectedCert;
        return params;
    };

    //初始化 Ukey 内置JS函数的对象
    function ukeyInitCryptoAgent(){
        var CryptoAgent;
        try {
            CryptoAgent = document.getElementById('bocCryptoAgent');
            return CryptoAgent;
        } catch (e) {
            return false;
        }
    }

    //选择证书,主要用来判断是否插入Ukey
    // 证书主题DN过滤条件 SubjectDNFilter
    // 证书序列号过滤条件 SNFilter
    // 证书主题中Email项过滤条件 EmailFilter
    // 颁发者主题DN过滤条件 IssuerDNFilter
    function selectCert(subjectDNFilter, SNFilter, emailFilter, issuerDNFilter,CryptoAgent){
        var message;//返回错误信息
        try {
            CryptoAgent.SetAlgorithm("SHA256", "");
            CryptoAgent.SetCertChooseType(1); //为了和老接口保持兼容性，而保留此函数。可以不调用。
            var selectCert = CryptoAgent.SetCert("SC", subjectDNFilter, SNFilter, emailFilter, issuerDNFilter, "");
            if (0 != selectCert) {
                message = CryptoAgent.GetErrorMessage(CryptoAgent.GetErrorCode());
                return message;
            }
            return selectCert;
        } catch (e) {
            if (typeof e == 'string') {
                throw e;
            } else {
                message = CryptoAgent.GetErrorMessage(CryptoAgent.GetErrorCode());
            }
        }
        return message;
    };

    //前端加密
    function BOCSign(original, CryptoAgent){
        try {
            CryptoAgent.SetAlgorithm("SHA256", "");
            CryptoAgent.SetCertChooseType(1); //为了和老接口保持兼容性，而保留此函数。可以不调用。
            var signature = CryptoAgent.DetachSignStr("", original);
            if (!signature) {
                throw CryptoAgent.GetErrorMessage(CryptoAgent.GetErrorCode());
            }
            return signature;
        } catch (e) {
            if (typeof e == 'string') {
                throw e;
            } else {
                var message = CryptoAgent.GetErrorMessage(CryptoAgent.GetErrorCode());
                throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
            }
        }
    };

    //前端提示
    function prompt(bootDialog){
        if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0){
            //20180726-STA-修改下载证书控件
            var  boc_cancel = "取消";
            var  boc_finish = "确定";
            var  boc_title = " UKey操作提示"
            var  boc_message = "请下载中行网银USBKey数字安全证书管理工具，安装完成后请重启浏览器！"
            //弹出提示
            bootbox.dialog({
                message: boc_message,
                title: boc_title,
                closeButton: true,
                buttons: {
                    OK: {
                        label: boc_finish,
                        className: 'hxbtn orange',
                        callback: function () {
                        }
                    }
                }
            });
        }else{
            alert("为保证系统正常使用，请使用Windows7及以上操作系统和IE10版本及以上的浏览器进行访问!");
        }
        return false;
    };
    
    //验证是否需要重新签约
    function checkUkey(ukeySenceSignObject){
        var flag = true;
        var params = {};
        if(ukeySenceSignObject.eventNode != "001" && ukeySenceSignObject.eventCode != "00"){
            $.ajax({
                url: "/admin/api/acountUkey/v2/bocCheckRegisterID",
                data: JSON.stringify(params),
                type: "POST",
                async: false,
                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    if(data.data.result!="success") {
                        if(confirm("您绑定的中国银行ukey已经更改验证方式，请输入网银登录名后重新验证ukey。")){
                            $('.wrap-dialog').removeClass("hide");
                            var loginName = window.showModalDialog("/admin/api/acountUkey/v2/bocloginName", "", "dialogHeight:500px;dialogWidth:800px;status:no;location:no");
                            $('.wrap-dialog').addClass("hide");
                            if(undefined == loginName || "" == loginName){
                                flag = false;
                                return "";
                            }
                            params.loginName = loginName;
                            params.registerMsgID = new Date().getTime();
                            var ukeySignObj = {};
                            var paramObject = {
                                "operatorType":"bindukey",
                                "documentType":data.data.CCB_SN,
                                "original":data.data.original,
                                "signOriginal":data.data.md5Original,
                                "userType":"shr",
                                "serialNo":ukeySenceSignObject.signObject.serialNo,
                                "bankType":ukeySenceSignObject.bankType,
                                "corpName":data.data.corpName,
                                "registerMsgID":params.registerMsgID,
                                "loginName":params.loginName,
                                "signAccount":data.data.signAccount,
                                "eventNode":"002",
                                "eventCode":"00",
                                "socialCreditCode":data.data.socialCreditCode
                            };
                            ukeySignObj.signParam = JSON.stringify(paramObject);
                            ukeySignObj.signBankType = ukeySenceSignObject.bankType;
                            JSON.stringify(params);
                            JSON.stringify(ukeySignObj);
                            $.ajax({
                                url: "/aisino/bank/sign/rule",
                                data: ukeySignObj,
                                type: "POST",
                                async: false,
                                contentType: 'application/x-www-form-urlencoded',
                                dataType: "json",
                                success: function (data) {
                                    var original = data.signedOriginal;
                                    try{
                                        if ( (!original) || (original == "") || (typeof original =="undefined") || (typeof original == "unknown") ) {
                                            flag = false;
                                            return "签名失败";
                                        }
                                        var cryptoAgent = ukeyInitCryptoAgent();
                                        if (!cryptoAgent) {
                                            var flag2 = prompt();
                                            if (flag2 == false) {
                                                flag = false;
                                                return "";
                                            }
                                        }
                                        var serialNo = cryptoAgent.GetCertCN();
                                        var signature = BOCSign(original,cryptoAgent);
                                        JSON.stringify(ukeySignObj);

                                        var obj = JSON.parse(ukeySignObj.signParam);
                                        var params = {};
                                        params.serialNo = serialNo;
                                        params.signature = signature;
                                        params.eventCode = obj.eventCode;
                                        params.eventNode = obj.eventNode;
                                        params.corpName = obj.corpName;
                                        params.loginName = obj.loginName;
                                        params.organID = obj.socialCreditCode;
                                        params.signedOriginal = original;
                                        params.registerMsgID = obj.registerMsgID;
                                        params.signAccount = obj.signAccount;
                                        params.socialCreditCode = obj.socialCreditCode;
                                        var json = JSON.stringify(params);
                                        json = encodeURIComponent(json);

                                        var ukey = {};
                                        ukey.signature = signature;
                                        ukey.bankType = obj.bankType;
                                        ukey.original = original;
                                        ukey.serialNo = serialNo;
                                        ukey.bankInterfaceInfo = json;
                                        $.ajax({
                                            url: "/admin/api/acountUkey/v2/changeUkeyBOC",
                                            data: JSON.stringify(ukey),
                                            type: "POST",
                                            async: false,
                                            contentType: 'application/json',
                                            dataType: "json",
                                            success: function (data) {
                                                if(data.data.result != "success"){
                                                    alert(data.data.info);
                                                    flag = false;
                                                    return "";
                                                }else {
                                                    alert("绑定成功,请继续业务签名。");
                                                    flag = true;
                                                    return "";
                                                }
                                            },error: function () {
                                                alert("操作失败");
                                                return false;
                                            }
                                        })
                                    }catch(e){
                                        alert('签名失败，请联系管理员！',2);
                                        flag = false;
                                        return "签名失败";
                                    }
                                }
                            })
                        }else {
                            flag = false;
                        }
                    }
                }
            })
        }
        return flag;
    }
};
/**
 * ukey相关继承操作
 */
var BOCUkey = BaseUkey.extend({
    init:function(){
        this.ukeyAction = new BOCUkeyAction();
    },
    getSerialNumber: function(bankUkeyParamsObject){
        return this.ukeyAction.getSerialNumber(bankUkeyParamsObject);
    },
    sign: function(ukeySenceSignObject){
        return this.ukeyAction.sign(ukeySenceSignObject);
    },
    getUkeyParams: function(bankUkeyParamsObject){
        return this.ukeyAction.getBOCUkeyParams(bankUkeyParamsObject);
    }
});