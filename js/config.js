'use strict';
angular.module('mainApp.configs', [])
.value('gloableConfig',{
	"name":"保宝通",
	//"ajxUr":"http://192.168.1.113/baobaotong_server/router.php",
	"ajxUr":"http://api.xiuyetang.com/router.php",
	"appkey":{
		"weibo": 1115277227,
		"qq":1212121
	},
	"tips":{
		crm_personadd: {
			name: "请正确填写姓名（不得超过6个字符）",
			tel: "请正确填写11位手机号码",
			email: "请正确填写电子邮箱（不得出现特殊字符）",
			selfzhen: "请正确填写XXX号码（不得少于15位或多于18位）",
			QQ: "请正确填写QQ号码（不得填写非数字）",
			sucess: "添加成功",
			error:"添加失败",
			editsucess: "修改成功",
			eredit: "修改失败",
			del:"删除成功",
			eredel:"删除失败"
		},
		crm_group:{
			name:"组名不能为空且组名长度不得超过12个字符"
		},
		zhaji:{
			title:"札记标题不得超过25个字符",
			content:"内容不能为空"
		},
		anli:{
			title:"案例标题不得超过25个字符",
			content:"内容不能为空",
			sucess:"添加成功",
			error:"添加失败",
			editsucess:"修改成功",
			editerror:"修改失败",
		},
		getmoney:{
			name:"支付宝账号为空",
			money:"金额不能为空",
			buzu:"余额不足，无法提取",
			error:"提现失败，请返回查看。",
			sucess:"充提成功!"
		},
		putmoney:{
			name:"支付宝账号为空",
			money:"金额不能为空",
			error:"充值失败，请返回查看。",
			sucess:"充值成功!"
		},
		product:{
			title:"标题不能为空",
			img:"图片不能为空",
			price:"单价不能为空且输入合理数字",
			kucun:"库存不能为空输入合理数字",
			addsucess:"添加成功！",
			erradd:"添加失败，请返回查看",
			del:"删除成功",
			errdel:"删除失败"
		}
	}
});


