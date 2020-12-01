var BOCUkeySignAction = function(){
    /**
     * 获取组织好的签名原文
     */
    this.setSignedOriginal = function(ukeyAuthSignObject) {
        //实名认证
        if (ukeyAuthSignObject.eventCode == "00" )  {
            ukeyAuthSignObject.signedOriginal = registAuthSign(ukeyAuthSignObject);
            return;
        }
        return ukeyAuthSignObject.signedOriginal;
    };

    /**
     * 实名认证签名原文
     * @param signObject
     * @returns
     */
    function registAuthSign(ukeyAuthSignObject) {
        //实名认证绑ukey的签名
        var ukeySignObj = {};
        if(ukeyAuthSignObject.eventNode == '003'){
            var paramObject = {
                "operatorType":ukeyAuthSignObject.signObject.operatorType,
                "documentType":ukeyAuthSignObject.signObject.CCB_SN,
                "userType":ukeyAuthSignObject.signObject.userType,
                "serialNo":ukeyAuthSignObject.signObject.serialNo,
                "summary":ukeyAuthSignObject.signObject.summary,
                "bankType":ukeyAuthSignObject.bankType,
                "corpName":$("input[name ='comName']").val(),
                "eventNode":ukeyAuthSignObject.eventNode,
                "eventCode":ukeyAuthSignObject.eventCode
            };
        }else if(ukeyAuthSignObject.eventNode == '004'){
            var paramObject = {
                "operatorType":ukeyAuthSignObject.signObject.operatorType,
                "documentType":ukeyAuthSignObject.signObject.CCB_SN,
                "userType":ukeyAuthSignObject.signObject.userType,
                "serialNo":ukeyAuthSignObject.signObject.serialNo,
                "summary":ukeyAuthSignObject.signObject.summary,
                "bankType":ukeyAuthSignObject.bankType,
                "corpName":$("#comName").val(),
                "eventNode":ukeyAuthSignObject.eventNode,
                "eventCode":ukeyAuthSignObject.eventCode
            };
        }else {
            $('.wrap-dialog').removeClass("hide");
            var loginName = window.showModalDialog("/admin/api/acountUkey/v2/bocloginName", "", "dialogHeight:500px;dialogWidth:800px;status:no;location:no");
            $('.wrap-dialog').addClass("hide");
            if(undefined == loginName || "" == loginName){
                return "";
            }
            ukeyAuthSignObject.loginName = loginName;
            var paramObject = {
                "operatorType":ukeyAuthSignObject.signObject.operatorType,
                "documentType":ukeyAuthSignObject.signObject.CCB_SN,
                "original":ukeyAuthSignObject.signObject.original,
                "signOriginal":ukeyAuthSignObject.signObject.signOriginal,
                "userType":ukeyAuthSignObject.signObject.userType,
                "serialNo":ukeyAuthSignObject.signObject.serialNo,
                "summary":ukeyAuthSignObject.signObject.summary,
                "bankType":ukeyAuthSignObject.bankType,
                "corpName":ukeyAuthSignObject.corpName,
                "registerMsgID":ukeyAuthSignObject.registerMsgID,
                "loginName":ukeyAuthSignObject.loginName,
                "signAccount":ukeyAuthSignObject.signAccount,
                "eventNode":ukeyAuthSignObject.eventNode,
                "eventCode":ukeyAuthSignObject.eventCode,
                "socialCreditCode":ukeyAuthSignObject.socialCreditCode
            }; 
        }

        
        ukeySignObj.signParam = JSON.stringify(paramObject);
        ukeySignObj.signBankType = ukeyAuthSignObject.bankType;
        var resultOriginal ="";
        $.ajax({
            url: "/aisino/bank/sign/rule",
            data: ukeySignObj,
            type: "POST",
            async: false,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (data) {
                ukeyAuthSignObject.signObject.original = data.beforeOriginal;
                ukeyAuthSignObject.signObject.resultOriginal = data.signedOriginal;
            }
        })
        resultOriginal = ukeyAuthSignObject.signObject.resultOriginal;
        return resultOriginal;
    }
};

var BOCUkeySign  = BaseUkeySign.extend({
    init:function(){
        this.action = new BOCUkeySignAction();
    },
    setSignedOriginal:function(signObject){
        this.action.setSignedOriginal(signObject);
    }
});