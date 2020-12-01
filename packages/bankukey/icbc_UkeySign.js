/**
 * 工商银行业务内容签名原文组件
 * 主要是根据不同业务场景设置签名原文
 */
var IcbcUkeySignAction = function(){
	/**
	 * 获取组织好的签名原文
	 */
	this.setSignedOriginal = function(signObject) {	
		//实名认证绑key
		if (signObject.eventCode == "00" )  {
			signObject.signedOriginal = registAuthSign(signObject);
			return;
		}
		return signObject.signedOriginal;
	};
	
	/**
	 * 实名认证签名原文
	 * @param signObject
	 * @returns
	 */
	function registAuthSign(ukeyAuthSignObject) {
		
		//实名认证绑ukey的签名
		if ("bindukey" == ukeyAuthSignObject.signObject.operatorType) {
			 var originalMD5 = 'SH="0";SN="'+ukeyAuthSignObject.signObject.CCB_SN+'";IN="0";SI="' + ukeyAuthSignObject.signObject.signOriginal + '";|';
			 var original = 'SH="0";SN="'+ukeyAuthSignObject.signObject.CCB_SN+'";IN="0";SI="' + ukeyAuthSignObject.signObject.original + '";|';
			 var originalMD5_ATTR = "";
			 if(ukeyAuthSignObject.signObject.userType == 'jbr'){
				 originalMD5_ATTR = 'SH="1";SN="绑定经办人ukey";IN="0";SI="";|';
			 } else {
		    	 originalMD5_ATTR = 'SH="1";SN="绑定审核人ukey";IN="0";SI="";|';
		     }
			 originalMD5 = originalMD5 + originalMD5_ATTR;
			 original = original + originalMD5_ATTR;
		     ukeyAuthSignObject.signObject.original = original;
		     ukeyAuthSignObject.signObject.signedOriginal = original;
		     return originalMD5;
		}
		//审核人首次登陆签名协议
		if ("submit" == ukeyAuthSignObject.signObject.operatorType) {
			 var original ='SH="1";SN="'+ukeyAuthSignObject.signObject.CCB_SN+'";IN="0";SI="' + ukeyAuthSignObject.signObject.summary + '";|';
			 ukeyAuthSignObject.signObject.original = original;
			 ukeyAuthSignObject.signObject.signedOriginal = original;
			 return original;
		}       
		//清欠系统首次认证签名认证
		if ("identityauth" == ukeyAuthSignObject.signObject.operatorType) {
			 var original ='SH="1";SN="'+ukeyAuthSignObject.signObject.CCB_SN+'";IN="0";SI="' + ukeyAuthSignObject.signObject.summary + '";|';
			 ukeyAuthSignObject.signObject.original = original;
			 ukeyAuthSignObject.signObject.signedOriginal = original;
			 return original;
		}   
		return "";
	} 
};

var IcbcUkeySign  = BaseUkeySign.extend({
	init:function(){
		this.action = new IcbcUkeySignAction();
	},
	setSignedOriginal:function(signObject){
		this.action.setSignedOriginal(signObject);
	}
});
