var AbcUkeyAction = function(){
    //获取证书序列号(供页面调用)
    this.getSerialNumber = function(bankUkeyParamsObject) {
        var params = {};
        params.issuerDn ="ABC";
        params.serialNo = BANK_TYPE_ABC;
        bankUkeyParamsObject.serialNo = params.serialNo;
        params.eventCode = bankUkeyParamsObject.eventCode;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json)
        bankUkeyParamsObject.ukeyObject = json;
        bankUkeyParamsObject.issureDn = params.issuerDn;
        return params.serialNo;
    };

    //证书签名(供页面调用)
    this.sign = function(ukeySenceSignObject) {
        var params = {};
        //获取ukey序列号
        var serialNo = BANK_TYPE_ABC;

        params.serialNo = serialNo;
        //获取ukey颁发者
        params.issuerDn = "ABC";
        var issuerDn = params.issuerDn;
        params.remark = BANK_TYPE_ABC;
        params.subjectDN = BANK_TYPE_ABC;
        params.subjectCN = BANK_TYPE_ABC;
        params.cspName = BANK_TYPE_ABC;
        params.eventCode = ukeySenceSignObject.eventCode;
        params.eventNode = ukeySenceSignObject.eventNode;
        params.signedOriginal = ukeySenceSignObject.signedOriginal;
        var signature = md5(ukeySenceSignObject.signedOriginal);

        params.signature = signature;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json);
        ukeySenceSignObject.ukeyObject = json;

        ukeySenceSignObject.signature = signature;
        ukeySenceSignObject.ukeyNo = serialNo;
        ukeySenceSignObject.isSuccess = true;
        //ukeySenceSignObject.callBackParams.ukeyParams.issureDn = "ABC";

        if (ukeySenceSignObject.signedCallBack != null) {
            ukeySenceSignObject.signedCallBack(ukeySenceSignObject);
        } else {
            return signature;
        }
    };


    /**
     * 工程航信平台添加该方法
     * 获取Ukey参数,ukey序列号及ukey颁发者
     */
    this.getUkeyParams = function(bankUkeyParamsObject){
        var params = {};
        //判断是否插入Ukey
        //获取ukey序列号
        var serialNo = BANK_TYPE_ABC;
        params.serialNo = serialNo;
        //获取ukey颁发者
        params.issuerDn = "ABC";

        params.remark = BANK_TYPE_ABC;
        params.subjectDN = BANK_TYPE_ABC;
        params.subjectCN = BANK_TYPE_ABC;
        params.cspName = BANK_TYPE_ABC;
        params.certSN = BANK_TYPE_ABC;

        params.eventCode=bankUkeyParamsObject.eventCode;
        params.eventNode=bankUkeyParamsObject.eventNode;
        bankUkeyParamsObject.serialNo = serialNo;
        bankUkeyParamsObject.issureDn = params.issuerDn;
        var json = JSON.stringify(params);
        json = encodeURIComponent(json)
        bankUkeyParamsObject.ukeyObject = json;
        return params;
    };
};
/**
 * ukey相关继承操作
 */
var AbcUkey = BaseUkey.extend({
    init:function(){
        this.ukeyAction = new AbcUkeyAction();
    },
    getSerialNumber: function(bankUkeyParamsObject){
        return this.ukeyAction.getSerialNumber(bankUkeyParamsObject);
    },
    sign: function(ukeySenceSignObject){
        return this.ukeyAction.sign(ukeySenceSignObject);
    },
    getUkeyParams: function(bankUkeyParamsObject){
        return this.ukeyAction.getUkeyParams(bankUkeyParamsObject);
    }
});


