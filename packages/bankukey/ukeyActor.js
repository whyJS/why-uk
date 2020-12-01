var aisino_bankType = [];

aisino_bankType[BANK_TYPE_JWL] = "JWLCREDIT";
//工商银行
aisino_bankType[BANK_TYPE_ICBC] = "ICBCCREDIT";
//建设银行
aisino_bankType[BANK_TYPE_CCB] = "CCBCREDIT";
//民生银行签名
aisino_bankType[BANK_TYPE_CMBC] = "CMBCCREDIT";
//中国银行
aisino_bankType[BANK_TYPE_BOC] = "BOCCREDIT";
//兴业银行
aisino_bankType[BANK_TYPE_CIB] = "CIBCREDIT";
//中信银行
aisino_bankType[BANK_TYPE_CITICIB] = "CITICIBCREDIT";
//华夏银行
aisino_bankType[BANK_TYPE_HB] = "HBCREDIT";

//交通银行
aisino_bankType[BANK_TYPE_JTYH] = "JTYHCREDIT";

//中国光大银行
aisino_bankType[BANK_TYPE_CEB] = "CEBCREDIT";

//农业银行
aisino_bankType[BANK_TYPE_ABC] = "ABCCREDIT";

//农业银行
aisino_bankType[BANK_TYPE_SPDB] = "SPDBCREDIT";

//招商银行
aisino_bankType[BANK_TYPE_CMB] = "CMBCREDIT";

var bankUkeyFactory = function(){
	/**
	 * 根据银行编号获取处理业务场景下针对不同业务进行操作的签名内容
	 * 获取组织签名的业务逻辑操作对象
	 */
	this.getUkeySignAction = function(_bankType) {
		var bankCode = aisino_bankType[_bankType];
		
		//建设银行
		if ("CCBCREDIT" == bankCode) {
			var ccbUkeySign = new CcbUkeySign();
			return ccbUkeySign;
		}
		
		//工商银行
		if ("ICBCCREDIT" == bankCode) {
			var icbcUkeySign = new IcbcUkeySign();
			return icbcUkeySign;
		}
		//民生银行
		if ("CMBCCREDIT" == bankCode) {
			var cmbcUkeySign = new CmbcUkeySign();
			return cmbcUkeySign;
		}
		
		//华夏银行
		if ("HBCREDIT" == bankCode) {
			var hbUkeySign = new HBUkeySign();
			return hbUkeySign;
		}
		
		//中信银行
		if ("CITICIBCREDIT" == bankCode) {
			var citicibUkeySign = new CITICIBUkeySign();
			return citicibUkeySign;
		}
		//兴业银行
		if ("CIBCREDIT" == bankCode) {
			var cibUkeySign = new CIBUkeySign();
			return cibUkeySign;
		}
		//中国银行
		if ("BOCCREDIT" == bankCode) {
			var bocUkeySign = new BOCUkeySign();
			return bocUkeySign;
			//			var cfcaUkeySign = new CfcaUkeySign();
			//			return cfcaUkeySign;
		}		
		
		//交通银行
		if ("JTYHCREDIT" == bankCode) {
			var cfcaUkeySign = new CfcaUkeySign();
			return cfcaUkeySign;
		}	

		//中国光大银行
		if ("CEBCREDIT" == bankCode) {
			var cebUkeySign = new CebUkeySign();
			return cebUkeySign;
		}	
		
		//CFCA证书
		if ("cfca" == bankCode) {
			var cfcaUkeySign = new CfcaUkeySign();
			return cfcaUkeySign;
		}
        //农业银行
        if ("ABCCREDIT" == bankCode) {
            var abcUkeySign = new AbcUkeySign();
            return abcUkeySign;
        }

		//浦发银行
		if ("SPDBCREDIT" == bankCode) {
			var spdbUkeySign = new SpdbUkeySign();
			return spdbUkeySign;
		}

		//招商银行
		if ("CMBCREDIT" == bankCode) {
			var cmbUkeySign = new CmbUkeySign();
			return cmbUkeySign;
		}

		var defaultUkey = new BaseUkeySign();
		return defaultUkey;
	};
	/**
	 * 获取银行ukey相关的组件
	 */
	this.getUkeyAction = function(_bankType) {
		var bankCode = aisino_bankType[_bankType];
		
		//建设银行
		if ("CCBCREDIT" == bankCode) {
			var ccbUkey = new CcbUkey();
			return ccbUkey;
		}
		
		//工商银行
		if ("ICBCCREDIT" == bankCode) {
			var icbcUkey = new IcbcUkey();
			return icbcUkey;
		}
		
		//民生银行
		if ("CMBCCREDIT" == bankCode) {
			var cmbcUkey = new CmbcUkey();
			return cmbcUkey;
		}
		
		//华夏银行
		if ("HBCREDIT" == bankCode) {
			var hbUkey = new HBUkey();
			return hbUkey;
		}
		
		//中信银行
		if ("CITICIBCREDIT" == bankCode) {
			var citicibUkey = new CITICIBUkey();
			return citicibUkey;
		}
		//兴业银行
		if ("CIBCREDIT" == bankCode) {
			var cibUkey = new CIBUkey();
			return cibUkey;
		}
		//中国银行
		if ("BOCCREDIT" == bankCode) {
			var bocUkey = new BOCUkey();
			return bocUkey;
			//			var cfcaUkey = new CfcaUkey();
			//			return cfcaUkey;
		}		

		//交通银行
		if ("JTYHCREDIT" == bankCode) {
			var cfcaUkey = new CfcaUkey();
			return cfcaUkey;
		}	
		
		//中国光大银行
		if ("CEBCREDIT" == bankCode) {
			var cebUkey = new CebUkey();
			return cebUkey;
		}	
		
		//CFCA证书
		if ("cfca" == bankCode) {
			var cfcaUkey = new CfcaUkey();
			return cfcaUkey;
		}
        //农业银行
		if ("ABCCREDIT" == bankCode) {
			var abcUkey = new AbcUkey();
			return abcUkey;
		}
		//浦发银行
		if ("SPDBCREDIT" == bankCode) {
			var spdbUkey = new SpdbUkey();
			return spdbUkey;
		}

		//招商银行
		if ("CMBCREDIT" == bankCode) {
			var cmbUkey = new CmbUkey();
			return cmbUkey;
		}

		var defaultUkey = new BaseUkey();
		return defaultUkey;
	};	
	
};


/**
 * ukey签名对应的参数
 */
var UkeyAjaxSignObject =  function() {
	null;  //请求url
	null; //签名业务参数
	null; //签名原文
	null; //银行code
	null;//业务执行错误信息
	false; //业务执行是否成功
	null; //签名原文签完加密后文件
	null; //ajax请求对应的上下文
};

/**
 * ukey操作行为对象
 */
var UkeyOperPageObj =  function() {
	var ukeyfactory = new bankUkeyFactory();
	//是否有对象属性 
	isHasAttr = function(obj, attr) {
	  //判断是否有该键值
	  if (obj && obj.hasOwnProperty(attr)) {
	    //如果有返回true
	    return true;
	  } 
	    return false;
	  
	};
	//ukey的序列号
	this.getSerialNumber = function (bankUkeyParamsObject){
		var bankCode = "";
		if (isHasAttr(bankUkeyParamsObject,"bankType")) {
			bankCode = bankUkeyParamsObject.bankType;
		} else {
			bankCode = bankUkeyParamsObject;
		}
		ukey = ukeyfactory.getUkeyAction(bankCode);
		return ukey.getSerialNumber(bankUkeyParamsObject);
	};
	/**
	 * ajax请求参数相关响应相关的业务内容之后签名处理
	 * ukey对应的签名
	 * 说明：签名业务参数参数里边需要包含eventCode（功能操作行为：00 实名认证 01 开立  02 接收 03 流转  04 拒收 05 撤回	06融资）
	 * 操作行为对应的eventNode 业务流程节点 经办人操作 001 审核人操作 002  
	 */ 
	this.ajaxSign = function(bankCode, signObject){
		$this = this;
		signObject.original = "";
		signObject.success = false;
		if (signObject.contentType == null) {
			signObject.contentType = "application/x-www-form-urlencoded";
		}
		$.ajax({
				url:signObject.url,
				async:false,
			    type: "post",
		        data: signObject.signParam,
		        contentType : signObject.contentType,
		        dataType: "json",
		        success: function (data) {
		        	if (isHasAttr(data, "used")) {
		        		if (data.used == true) {
		        			signObject.original = data.signedOriginal;
		        			signObject.success = true;
		        		}
		        	} else {
		        		signObject.success = false;
		        	}
		        }
			});
		
		if (signObject.success) {
			var ukey = ukeyfactory.getUkeyAction(bankCode);
			signObject.signedData = ukey.sign(signObject.original);
			return signObject.signedData;
		} 
	};
	/**
	 * 签名
	 * 参数：银行code  签名原文
	 */
	this.sign = function(bankCode, ukeySenceSignObject) {
		
		//获取银行ukey操作的基础组件
		var ukey = ukeyfactory.getUkeyAction(bankCode);
		//获取银行ukey签名基础组件
		var ukeySign = ukeyfactory.getUkeySignAction(bankCode);
		//根据不同的业务场景设置需要签名的原文内容
		ukeySign.setSignedOriginal(ukeySenceSignObject);
		//进行银行ukey的签名操作
		var signature = ukey.sign(ukeySenceSignObject);
		//设置签名内容
		ukeySenceSignObject.signature = signature;
		return signature;
		
	};
	/**
	 * 签名受理并且执行签名完成之后执行的回调函数
	 * 参数：
	 * 1、ukey银行编码
	 * 2、签名业务场景数据对象
	 * 3、签名完成之后需要执行后续回调业务逻辑方法
	 */
	this.signCallBack = function(bankCode, ukeySenceSignObject, signedCallBack) {
		ukeySenceSignObject.signedCallBack = signedCallBack;
		//获取银行ukey操作的基础组件
		var ukey = ukeyfactory.getUkeyAction(bankCode);
		//获取银行ukey签名基础组件
		var ukeySign = ukeyfactory.getUkeySignAction(bankCode);
		//根据不同的业务场景设置需要签名的原文内容
		ukeySign.setSignedOriginal(ukeySenceSignObject);
		//进行银行ukey的签名操作
		var signature = ukey.sign(ukeySenceSignObject);
		//设置签名内容
		ukeySenceSignObject.signature = signature;
		return signature;
		
	};
	/**
	 * 获取相关的ukey参数
	 */
	this.getUkeyParams = function(bankUkeyParamsObject){
		var bankCode = "";
		if (isHasAttr(bankUkeyParamsObject,"bankType")) {
			bankCode = bankUkeyParamsObject.bankType;
		} else {
			bankCode = bankUkeyParamsObject;
		}
		ukey = ukeyfactory.getUkeyAction(bankCode);
		var params = ukey.getUkeyParams(bankUkeyParamsObject);
//		var ukeyInfo = JSON.stringify(params);
//		var ukeyjson = encodeURIComponent(ukeyInfo)
//		bankUkeyParamsObject.ukeyObject = ukeyjson;
		return params;
	};	
};

var ukeyActor = new UkeyOperPageObj();