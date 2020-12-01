var BaseUkeySignAction = function(){
	/**
	 * 获取组织好的签名原文
	 */
	this.setSignedOriginal = function(ukeySenceSignObject) {
		return ukeySenceSignObject.signedOriginal;
	}
};

var BaseUkeySign  = Class.extend({
	init:function(){
		this.action = new BaseUkeySignAction();
	},
	setSignedOriginal:function(signObject){
		this.action.setSignedOriginal(signObject);
	}
});
