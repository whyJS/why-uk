/**
 *
 */
var baseukeyAction = function(){
	function generateUUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};
	/**
	 *
	 */
	this.getSerialNumber = function(bankUkeyParamsObject) {
		return generateUUID();
	};
	/**
	 *
	 */
	this.sign = function(ukeySenceSignObject) {
		return md5(ukeySenceSignObject.signedOriginal);
	};
	/**
	 * 工程航信平台添加该方法
	 * 获取Ukey参数,ukey序列号及ukey颁发者
	 */
	this.getUkeyParams = function(bankUkeyParamsObject){
	  var params = {};
	  params.serialNo = generateUUID();
	  return params;
	};

};

var BaseUkey  = Class.extend({
		init:function(){
			this.action = new baseukeyAction();
		},
		getSerialNumber: function(bankUkeyParamsObject){
			return this.action.getSerialNumber(bankUkeyParamsObject);
		},
		sign: function(ukeySenceSignObject){
			return this.action.sign(ukeySenceSignObject);
		},
		getUkeyParams: function(bankUkeyParamsObject){
			return this.action.getUkeyParams(bankUkeyParamsObject);
		}
});
