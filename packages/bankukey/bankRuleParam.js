/**
 * 执行业务规则之后返回的业务参数
 */
var BankRuleExport = function() {
	used:false; //业务是否可以执行 false 不能执行 true 可以执行
	promptMsg:""; //业务不能执行的错误信息提示
	usedBankList:null; //业务可以执行的时候可以选择的银行列表 是以数组的形式呈现
	bankOperInfo:null;
	selectBankType:null;
};
/**
 * 业务规则对应的输入参数
 */
var BankRuleImport = function() {
	eventCode : null; //业务操作事件行为 00 实名认证 01 开立  02 接收 03 流转  04 拒收 05 撤回	06融资
	eventNode : null; //业务流程节点 经办人操作 001 审核人操作 002
	creditBankType : null; //授信银行编码
	ownerid : null; //工程航信持有人
    receiveid : null; //工程航信接收人
}
