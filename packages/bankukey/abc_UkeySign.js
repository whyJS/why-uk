var AbcUkeySignAction = function(){
	/**
	 * 获取组织好的签名原文
	 */
	this.setSignedOriginal = function(ukeySenceSignObject) {
		return ukeySenceSignObject.signedOriginal;
	}
};

var AbcUkeySign  = Class.extend({
	init:function(){
		this.action = new AbcUkeySignAction();
	},
	setSignedOriginal:function(signObject){
		this.action.setSignedOriginal(signObject);
	}
});
