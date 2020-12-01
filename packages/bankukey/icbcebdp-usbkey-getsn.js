//使用样例方法
//function icbckey(){
//	if (loadU.loadFlg == 0) {
//	loadU.assembleHtml();
//	loadU.loadFlg =1;
//	}
//
//	getSn(1);
//}
//
////获取U盾介质号
//function getSn(flag){
//	loadU.getSnByLfy();
//	var sn = loadU.sn;
//	
//	//如果直接能获取，就跳转到后台
//	if(sn != "0"){
//		alert(sn);
//	}else{
//	//否则显示页面，提示客户插入U盾
//		if(flag == '1'){
//			alert("请插入U盾后再点击确定按钮");
//		}
//		return;
//	}
//}

/*
 * 工商银行获取工行u盾编码脚本
 */
function UsbkeyGetSn() {
	this.loadFlg = 0;
	this.sn = "";
	this.errMsg = "成功";
	this.errNo = "0";
}

UsbkeyGetSn.prototype.judgeBrowerType = function() {
	var brower = navigator.userAgent;
	if ((brower.indexOf("MSIE") > -1) && (brower.indexOf("compatible") > -1)
			&& (brower.indexOf("Opera") < 0)) {
		return 0;// "ie";
		// alert("ie");
	} else if (brower.indexOf("Chrome") > -1) {
		return 1;// "chrome";
		// alert("chrome");
	} else if (brower.indexOf("Safari") > -1) {
		return 2;// "safari";
		// alert("safari");
	} else if (brower.indexOf("Firefox") > -1) {
		return 3;// "firefox";
		// alert("firefox");
	} else if (brower.indexOf("Opera") > -1) {
		return 4;// "opera";
		// alert("opera");
	} else if (brower.indexOf("Netscape") > -1) {
		return 5;// "netscape";
		// alert("netscape");
	} else if ((brower.indexOf("Windows NT 6.1") > -1)
			&& (brower.indexOf("Trident/7.0") > -1)) {
		return 0;// edge ie
	} else if (!!window.ActiveXObject || "ActiveXObject" in window){
		return 0;//all ie
	} else {
		return 6;// other
	}
	// Query 从 1.9 版开始，移除了 $.browser 和 $.browser.version ， 取而代之的是 $.support 方法
	// var brow=$.browser;
	//	 
	// var bInfo="";
	//	 
	// if(brow.msie){bInfo="MicrosoftInternetExplorer"+brow.version;}
	//	 
	// if(brow.mozilla){bInfo="MozillaFirefox"+brow.version;}
	//	 
	// if(brow.safari){bInfo="AppleSafari"+brow.version;}
	//	 
	// if(brow.opera){bInfo="Opera"+brow.version;}
	//	 
	// alert(bInfo);

};

UsbkeyGetSn.prototype.assembleHtml = function() {
	var browerTag = this.judgeBrowerType();
	// var ieBit=judgeIeBit();
	// ie
	var objectJsonIe = [ {
		"id" : "ie32oneGALL",
		"classid" : "clsid:E4BFF825-2E50-4BCC-8497-6EFDFB6C9B3D",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie32twoCHHTDR",
		"classid" : "clsid:B219E31C-E110-4638-AF01-7BDD5ACA552C",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie32twoTDR",
		"classid" : "clsid:50B20C64-357F-4A51-A5D2-5BF4930F4B3D",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie32twoHH",
		"classid" : "clsid:2FC1485C-2FC3-43c8-BE60-524A437BA6C3",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie32twoFT",
		"classid" : "clsid:0884588F-60D8-4E12-8570-B86018E0288F",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie32twoMH",
		"classid" : "clsid:448141AA-CF15-4C61-9C95-1A739EA202BE",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64oneGALL",
		"classid" : "clsid:52A56D4A-7243-412c-87E3-A7EB0C16AEEA",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64twoCHHTDR",
		"classid" : "clsid:B219E31C-E110-4638-AF01-7BDD5ACA5D64",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64twoTDR",
		"classid" : "clsid:32348DB2-82FC-4642-8CFA-514DCA7F5B45",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64twoHH",
		"classid" : "clsid:95F7E0AB-CDD7-4171-8A33-213174E42998",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64twoFT",
		"classid" : "clsid:810ABF76-C71C-4B6A-833D-F8A56CBE12FE",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	}, {
		"id" : "ie64twoMH",
		"classid" : "clsid:9940318B-C9C8-44d5-AF77-2D1E5B947A97",
		"width" : "0",
		"height" : "0",
		"hiden" : "true"
	} ];

	// 非ie
	var objectJsonChrome = [ {
		"id" : "chromeJDONE",
		"type" : "application/npicbc_gd_usbkey",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeHHONE",
		"type" : "application/npicbc_hh_usbkey1g",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeHHCH",
		"type" : "application/npicbc_hh_usbkey2gchinese",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeHHMU",
		"type" : "application/npicbc_hh_usbkey2gmultilanguage",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeFT",
		"type" : "application/npicbc_ft_usbkey",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeMH",
		"type" : "application/npicbc_mw_usbkey",
		"width" : "0",
		"height" : "0"
	}, {
		"id" : "chromeTDR",
		"type" : "application/npicbc_tdr_usbkey",
		"width" : "0",
		"height" : "0"
	} ];

	var htmlText = "";
	if (browerTag == 0) {
		$.each(objectJsonIe, function(i, item) {
			htmlText += '<object id="' + item.id + '" classid="' + item.classid
					+ '" width="' + item.width + '" height="' + item.height
					+ '" hiden="' + item.hiden + '">' +
					// '<embed id="' + item.id
					// + '" classid="' + item.classid + '" width="' + item.width
					// + '" height="' + item.height + '" hiden="' + item.hiden +
					// '">'
					// + '</embed>
					'</object>';
		});
	} else if (browerTag == 1 || browerTag == 2) {
		$.each(objectJsonChrome, function(i, item) {
			htmlText += '<embed id="' + item.id + '" type="' + item.type
					+ '" width="' + item.width + '" height="' + item.height
					+ '">';
		});
	}
	$("body").append(htmlText);
};

UsbkeyGetSn.prototype.judgeIeBit = function() {
	// var shell = new ActiveXObject("Wscript.Shell");
	// var
	// value=shell.RegRead("HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session
	// Manager\\Environment\\PROCESSOR_ARCHITECTURE");
	// value=value.toLowerCase();
	// if(value.indexOf("64")>=0) {
	// alert("x64");
	// return "x64";}
	// alert("x86");
	// return "x86";

	// var agent=navigator.userAgent.toLowerCase();
	// if(agent.indexOf("win64")>=0||agent.indexOf("wow64")>=0){
	// alert("x64");
	// return "x64";}
	// alert("cpuclass:"+navigator.cpuClass);
	return navigator.cpuClass;
};

UsbkeyGetSn.prototype.getSnByLfy = function() {
	// 拼接Object 标签
	// assembleHtml();
	// 判断浏览器类型
	var browerTypeBit = this.judgeBrowerType();
	var sn = "";
	switch (browerTypeBit) {
	case 0:
		this.sn = this.ieGetSnMethod();
		// return sn;
		// alert(browerTypeBit);
		break;
	case 1:
		this.sn = this.chromeGetSnMethod();
		// alert(browerTypeBit);
		// return sn;
		break;
	case 2:
		this.sn = this.safariGetSnMethod();
		// alert(browerTypeBit);
		// return sn;
		break;
	default:
		this.sn = "0";
		// return "0";
		// alert(browerTypeBit);
		break;

	}

};

UsbkeyGetSn.prototype.ieGetSnMethod = function() {
	var ieBit = this.judgeIeBit();
	var sn = "";
	if (ieBit == "x86") {
		// 天地融
		try {
			sn = ie32twoTDR.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}

		// 華虹
		try {
			sn = ie32twoHH.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}

		// 飛天
		try {
			sn = ie32twoFT.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}

		// 明華
		try {
			sn = ie32twoMH.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}

		// 華虹二代中文
		try {
			sn = ie32twoCHHTDR.GetMediaIDC();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 一代所有
		for ( var i = 1; i <= 4; i++) {
			try {
				sn = ie32oneGALL.SetMediaLib(i);
				sn = ie32oneGALL.getMediaID();
			} catch (e) {
				// alert(e.number + "~" + e.message);
				sn = "";
			}
			if (sn != "")
				break;
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}

		// 获取不到返回 0
		return "0";

	} else {

		// 天地融
		try {
			sn = ie64twoTDR.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 華虹
		try {
			sn = ie64twoHH.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 飛天
		try {
			sn = ie64twoFT.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 明華
		try {
			sn = ie64twoMH.GetMediaID();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 華虹二代中文
		try {
			sn = ie64twoCHHTDR.GetMediaIDC();
			// alert(sn);
		} catch (e) {
			// alert(e.message + " \r\nerrorno : " + e.number);
			// return;
			sn = "";
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 一代所有
		for ( var i = 1; i <= 4; i++) {
			try {
				sn = ie64oneGALL.SetMediaLib(i);
				sn = ie64oneGALL.getMediaID();
			} catch (e) {
				// alert(e.number + "~" + e.message);
				sn = "";
			}
			if (sn != "")
				break;
		}
		if (sn != "") {
			// alert(sn);
			return sn;
		}
		// 获取不到返回 0
		return "0";
	}
};

UsbkeyGetSn.prototype.chromeGetSnMethod = function() {
	// 天地融多語言
	try {
		sn = chromeTDR.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹多語言
	try {
		sn = chromeHHMU.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 飛天多語言
	try {
		sn = chromeFT.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 明華多語言
	try {
		sn = chromeMH.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹二代中文
	try {
		sn = chromeHHCH.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹一代
	try {
		sn = chromeHHONE.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 捷德一代
	try {
		sn = chromeJDONE.GetMediaID();
		if (sn < 0)
			sn = "";
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}
	// 获取不到返回 0
	return "0";
};

UsbkeyGetSn.prototype.safariGetSnMethod = function() {
	// 天地融多語言
	try {
		sn = chromeTDR.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹多語言
	try {
		sn = chromeHHMU.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 飛天多語言
	try {
		sn = chromeFT.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 明華多語言
	try {
		sn = chromeMH.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹二代中文
	try {
		sn = chromeHHCH.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 華虹一代
	try {
		sn = chromeHHONE.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}

	// 捷德一代
	try {
		sn = chromeJDONE.GetMediaID();
		// alert(sn);
	} catch (e) {
		// alert(e.message + " \r\nerrorno : " + e.number);
		// return;
		sn = "";
	}
	if (sn != "") {
		// alert(sn);
		return sn;
	}
	// 获取不到返回 0
	return "0";
};

UsbkeyGetSn.prototype.getSnGuid = function() {
	// CLSID:E4BFF825-2E50-4BCC-8497-6EFDFB6C9B3D 一代
	var ukeyOne = new ActiveXObject("USBKEY.AxUSBKey.1");
	// CLSID:50B20C64-357F-4A51-A5D2-5BF4930F4B3D 天地融
	var ukeyTdrGm = new ActiveXObject("ICBC_TdrGMUsbKey.GMToken_ICBC.1");
	// CLSID:0EFBFCB4-AA29-40C6-B895-1C5F41F9E8B1 华虹
	// var ukeyHhGm = new ActiveXObject("");
	var sn = "";

	// 天地融ukey
	if (ukeyTdrGm) {
		try {
			var sn = ukeyTdrGm.GetMediaID();
			alert(sn);
		} catch (e) {
			alert(e.message + " \r\nerrorno : " + e.number);
			return;
		}
	} else {
		alert("no driver");
	}

	// 华虹ukey
	if (ukeyHhGm) {
		try {
			var sn = ukeyHhGm.GetMediaID();
		} catch (e) {
			alert(e.message + " \r\nerrorno : " + e.number);
			return;
		}
	} else {
		alert("no driver");
	}

	// 一代ukey
	if (ukeyOne) {
		for ( var i = 1; i <= 4; i++) {
			try {
				sn = ukeyOne.SetMediaLib(i);
				sn = ukeyOne.getMediaID();
			} catch (Exception) {
				return;
				// alert(e.number + "_" + e.message);
			}
			if (sn != "")
				break;
		}
		alert(sn);
	} else {
		alert(0);
	}
};
