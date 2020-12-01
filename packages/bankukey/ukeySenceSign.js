/**
 * ukey签名对应的业务参数 主要是用于前端的业务签名使用的参数对象
 * 说明：签名业务参数参数里边需要包含eventCode（功能操作行为：00 实名认证 01 开立  02 接收 03 流转  04 拒收 05 撤回	06融资）
 * 操作行为对应的eventNode 业务流程节点 经办人操作 001 审核人操作 002  
 * 特殊设定：在流转拆分是001 002设置为经办人操作 003 004设置为审核人操作
 * 参数说明
 */
var UkeySenceSignObject = function(){
	//这个是前置参数 调用签名sign方法是需要进行前期设置
	eventCode : null; //业务操作事件行为 00 实名认证 01 开立  02 接收 03 流转  04 拒收 05 撤回	06融资 这个是前置参数
    eventNode : null; //业务流程节点 经办人操作 001 审核人操作 002 这个是前置参数
	bizCode: null; //业务场景OK biz001--实名认证完成 审核人首次登陆场景
	bankType : null; //银行编码 这个是前置参数
	signObject : null; //根据业务需要进行的签名的业务数据，组织形式数据对象Object信息 这个是前置参数
	signedCallBack:null; //签名完成之后需要回调的方法  这个是前置参数 这个参数不能设置为空
	callBackParams : null; //签名完成之后回调参数涉及到的参数集合

	//下边参数是返回参数列表
	isDirectCall:false;
	signature: null;//签名原文在ukey中签名的验签内容 返回参数
	signedOriginal:null;//签名原始的内容
	signECOriginal:null;//签名内容编码过后的签名原文内容
	ukeyNo:null; //签名U盾编号
	isSuccess:false; //签名是否成功标记 返回参数 
	errMsg:null; //签名的错误信息 返回参数
	ukeyObject:null; //ukey相关参数
	issureDn:null;
}

var BankUkeyParamsObject = function() {
	bankType : null; //银行编码 这个是前置参数
	serialNo:null;
	ukeyObject:null; //ukey参数对象
	issureDn:null;
	eventCode:null; //业务操作事件行为 00 实名认证 01 开立  02 接收 03 流转  04 拒收 05 撤回	06融资 这个是前置参数
	eventNode : null; //业务流程节点 经办人操作 001 审核人操作 002 这个是前置参数
}
