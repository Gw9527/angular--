'use strict';
angular.module('mainApp.controller', ['LocalStorageModule'])
.controller('zhanpers', ['$rootScope', '$scope','MYHTTPAjax','$stateParams','cookie','gloableConfig','localStorageService', function($rootScope,$scope,MYHTTPAjax,$stateParams,cookie,gloableConfig,localStorageService) {
	
	cookie();
	//查看是不是第一次登陆
	var getLocalStorage = localStorageService.get("BAOBAOTONG");
	
	if(!localStorageService.get("BAOBAOTONG").isFirst){
		$('.ui-first-tip').show();
		$rootScope.firstDelShow = function(t,x){
			if(x){
				$(t.target).hide();
				$('.'+x).show();
			}else{
				$(t.target).parent().hide();
			}
		};
		getLocalStorage.isFirst = 1;
		localStorageService.set("BAOBAOTONG",getLocalStorage);
	}
	//获取通讯录列表(viewPerData)、每个人信息(SinglePerData)
	MYHTTPAjax('api.ext.bbw.crm.list').then(function(result){
		if(result.status){
			if(!result.data.length){
				$('.erro-tip-text').eq(0).addClass('erro-tip-textnpo').html('暂时没有数据，赶快添加吧！');
			}else{
				$rootScope.viewPerData = result.data;
				for(var i=0; i<result.data.length; i++){
					if(result.data[i].crmid == $stateParams.id){
						$scope.SinglePerData = result.data[i];
						//t($scope.SinglePerData);
					}
				}
				$scope.sex = ['男','女'];
			}
		}else{
			$('.erro-tip-text').eq(0).addClass('erro-tip-textnpo').html('暂时没有数据，赶快添加吧！');
		}
		//console.log($scope.SinglePerData);
	});
	//获取证件类型
	MYHTTPAjax('api.ext.bbw.crm.cateofid').then(function(result){
		if(result.status){
			$scope.cateofidData = result.data;
			//console.log($scope.cateofidData);
		}
	});
	//获取群组列表
	MYHTTPAjax('api.ext.bbw.crm.listgroup').then(function(result){
		if(result.status){
			$rootScope.groupData = result.data;
		}else{
			$('.erro-tip-text').eq(1).addClass('erro-tip-textnpo').html('暂时没有数据，赶快添加吧！');
		}
	});

	//添加修改验证
	$scope.checkAttr = function(){
		$('.erro-tip-text').html('');
		if(!$('input[name=pername]').val() || $('input[name=pername]').val().length>6){
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.name);
			return false;
		}
		if(!/^1\d{10}$/.test($('input[name=mobile]').val())){
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.tel);
			return false;
		}
		if($('input[name=email]').val() && !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test($('input[name=email]').val())){
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.email);
			return false;
		}
		if($('select[name=cardtype]').val() == 1 && $('input[name=cardno]').val() && !/(^\d{15}$)|(^\d{17}(\d|X)$)/.test($('input[name=cardno]').val())){
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.selfzhen);
			return false;
		}else if($('select[name=cardtype]').val() == 2 && $('input[name=cardno]').val() && !/[a-zA-Z]+/.test($('input[name=cardno]').val())){
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.selfzhen);
			return false;
		}
		if($('input[name=perqq]').val() && isNaN($('input[name=perqq]').val()*1)){
			$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.QQ);
			return false;
		}

		return {
			data:[{
				name:$('input[name=pername]').val(),
				sex:$('input[name=persex]:checked').val(), 
				tel:$('input[name=mobile]').val(),
				memo:{
					email:$('input[name=email]').val(),
		      		credetype:$('select[name=cardtype]').val(),
		      		coustmer_uid:$('input[name=cardno]').val(),//证件号码
		      		group:$('select[name=pertype]').val(),//群组
		      		job:$('input[name=perjob]').val(),
		      		qq:$('input[name=perqq]').val(),
		      		address:$('input[name=peraddrd]').val(),
		      		familymoney:$('input[name=permoney]').val(),
		      		familydis:$('input[name=perdisease]').val(),
		      		remarks:$('textarea').val()
				}
			}]
		};
	};

	//添加用户
	$scope.kehuAddPersons = function(){

		var param = $scope.checkAttr();
		if(!param)return false;

		MYHTTPAjax('api.ext.bbw.crm.input',param).then(function(result){
			if (result.status) {
				$rootScope.viewPerData.unshift(result.data);
				$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.sucess);
			}else{
				$('.erro-tip-text').eq(2).html(result.msg);
			}
		});
		
	};
	//修改用户
	$scope.perEditSubmit = function(){
		var param = $scope.checkAttr();
		if(!param)return false;
		var paramnew = {
			crmid:$stateParams.id,
			name:$('input[name=pername]').val(),
			sex:$('input[name=persex]:checked').val(), 
			tel:$('input[name=mobile]').val(),
			email:$('input[name=email]').val(),
      		credetype:$('select[name=cardtype]').val(),
      		coustmer_uid:$('input[name=cardno]').val(),//证件号码
      		group:$('select[name=pertype]').val(),//群组
      		job:$('input[name=perjob]').val(),
      		qq:$('input[name=perqq]').val(),
      		address:$('input[name=peraddrd]').val(),
      		familymoney:$('input[name=permoney]').val(),
      		familydis:$('input[name=perdisease]').val(),
      		remarks:$('textarea').val()
		};

		MYHTTPAjax('api.ext.bbw.crm.modify',paramnew).then(function(result){
			if (result.status) {
				$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.editsucess);
			}else{
				$('.erro-tip-text').eq(2).html(gloableConfig.tips.crm_personadd.eredit);
			}
		});
	};
	//编辑
	var count = 0;
	$scope.deletPer = function(){
		count++;
		if(count%2){
			$('.ui-form-checkbox').css('visibility','visible');
			$('.ui-bottom-toolbar').addClass('ui-bottom-toolbar-visi');
		}else{
			$('.ui-form-checkbox').css('visibility','hidden');
			$('.ui-bottom-toolbar').removeClass('ui-bottom-toolbar-visi');
		}
	};
	//选择和用户跳转间的事件判断
	$scope.checkactive = function(event){
		if(count%2){
			//event.stopPropagation();
			if(!$(event.target).is('input')){
				event.preventDefault();//阻止链接跳转
				var parentClass = $(event.target).parents('.ui-parent-class'),
					nowInput = parentClass.find('input')[0];
				parentClass.removeAttr('href');
				nowInput.checked = !nowInput.checked;
			}
		}else{
			var parentClass = $(event.target).parents('.ui-parent-class');
			parentClass.attr('href',parentClass.attr('data-href'));
		}
	};

	//添加用户组
	$scope.kehuAddgroups = function(){

		if(!$('input[name=groupname]').val()){
			$('.erro-tip-text').html(gloableConfig.tips.crm_group.name);
			return false;
		}
		var param = {
			groupname: $('input[name=groupname]').val()
		};

		MYHTTPAjax('api.ext.bbw.crm.creategroup',param).then(function(result){
			if (result.status) {
				$rootScope.groupData.unshift(result.data.data);
			}
		});
	};

	//选中nav
	$('.ui-nav a').removeClass('ui-nav-active').eq(0).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(1).addClass('ui-navbread-active');	
}])
//全选
.controller('allChecked', ['$scope', function($scope) {
	$scope.allCheckeds = function(target){
		if(target.nodeName != 'INPUT'){
			target = $(target).find('input')[0];
			$(target).attr('checked', !$(target).is(':checked'));
		}
		$('.ui-form-checkbox').css('visibility','visible').attr('checked', $(target).is(':checked'));
	};
}])
//删除
.controller('kehuDel', ['$scope','gloableConfig','MYHTTPAjax', '$rootScope', function($scope,gloableConfig,MYHTTPAjax,$rootScope) {
	
	$scope.kehuDels = function(target){
		var crmid = [];

		//console.log($('.ui-kehu-list:visible'));
		angular.forEach($('.ui-kehu-list:visible').find("input:checked"), function(data, index){
			//console.log(data.value)
			crmid.push(data.value);
		});

		if($('.ui-kehu-list:visible').attr('data-deltype')=='kucun'){
			var method = 'api.ext.bbw.wood.del';
			var param = {
				data: crmid
			};
		}else if($('.ui-kehu-list:visible').attr('data-deltype')=='person'){
			var method = 'api.ext.bbw.crm.del';
			var param = {
				crmid: crmid,
				data: crmid
			};
		}else{
			var method = 'api.ext.bbw.crm.delgroup';
			var param = {groupid:crmid.join('')};
		}
		
		MYHTTPAjax(method,param).then(function(result){
			if (result.status) {
				if($('.ui-kehu-list:visible').attr('data-deltype')=='person'){
					for(var j=0;j<crmid.length;j++){
						for(var i=0;$rootScope.viewPerData.length;i++){
							if(crmid[j] == $rootScope.viewPerData[i].crmid){
								$rootScope.viewPerData.splice(i,1);
								break;
							}
						}
					}
				}
				if($('.ui-kehu-list:visible').attr('data-deltype')=='group'){
					for(var i=0;i<$rootScope.groupData.length;i++){
						if(crmid.join('')==$rootScope.groupData[i].groupid){
							$rootScope.groupData.splice(i,1);
							break;
						}
					}
					
					
				}
				if($('.ui-kehu-list:visible').attr('data-deltype')=='kucun'){
					for(var j=0;j<crmid.length;j++){
						for(var i=0;$rootScope.kucunDataS.length;i++){
							if(crmid[j] == $rootScope.kucunDataS[i].id){
								$rootScope.kucunDataS.splice(i,1);
								break;
							}
						}
					}
				}
			}else{
				alert('修改失败');
			}
		});
	};
}])
//客户管理tab切换
.controller('kehuTab', ['$scope', function($scope) {
	$scope.kehuTabs = function(target){
		var tabActive = $('.ui-kehu-tab-active'),
			index = $(target).attr('data-index');

		
		tabActive.removeClass('ui-kehu-tab-active');
		$(target).addClass('ui-kehu-tab-active');

		$('.ui-kehu-list').css('display','none');
		$('.ui-kehu-list').eq(index).css('display','block');
		//tabActiveContent.css('display','none');

		tabActive = $(target);
	};
}])
//群用户展示
.controller('groupView', ['$scope','$stateParams','MYHTTPAjax','cookie', function($scope,$stateParams,MYHTTPAjax,cookie) {
	cookie();
	var param = {
		groupid: $stateParams.id
	};

	MYHTTPAjax('api.ext.bbw.crm.list',param).then(function(result){
		if (result.status) {
			if(result.data.length){
				$('.erro-tip-text').eq(2).html('');
				$scope.groupViewDatas = result.data;
			}else{
				$('.erro-tip-text').eq(2).html('暂时内没有内容，赶快去通讯录修改群组添加进来吧');
			}
			
		}
	});
}])
//任务 directies mion
//札记
.controller('zhajiUrl', ['$scope','$stateParams', '$location','$rootScope','gloableConfig','openInNewWindows', 'MYHTTPAjax','cookie',function($scope, $stateParams, $location,$rootScope,gloableConfig,openInNewWindows,MYHTTPAjax,cookie) {
	cookie();
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(3).addClass('ui-navbread-active');
	$scope.argument = $location.$$url.replace(/\//g,'');//区分模板
	MYHTTPAjax('api.ext.bbw.daily.list',{page:0}).then(function(result){
		if (result.status) {
			$rootScope.zhajiDatas = result.data;

			for(var i=0; i<result.data.length; i++){
				if(result.data[i].id == $stateParams.id){
					$scope.zhajiSingDatas = result.data[i];
				}
			}

			$scope.share = function(event){
				var tag = event.target;
				if($(tag).attr('data-share')=='weibo'){
					var url = 'http://service.weibo.com/share/share.php?',
						appkeyvalue = gloableConfig.appkey.weibo,
						param = 'appkey='+appkeyvalue+'&url='+encodeURIComponent($scope.zhajiSingDatas.shareurl)+'&title='+encodeURIComponent($scope.zhajiSingDatas.title)+'&pic='+$scope.zhajiSingDatas.shareurlpic+'#_loginLayer_'+appkeyvalue;
				}

				if($(tag).attr('data-share')=='qq'){
					var url = 'http://connect.qq.com/widget/shareqq/index.html?',
						param = '&url='+encodeURIComponent($scope.zhajiSingDatas.shareurl)+'&desc='+encodeURIComponent($scope.zhajiSingDatas.title)+'&pics='+$scope.zhajiSingDatas.shareurlpic+'&site='+encodeURIComponent(gloableConfig.name);
				}

				if($(tag).attr('data-share')=='qzone'){
					var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
						param = '&url='+encodeURIComponent($scope.zhajiSingDatas.shareurl)+'&title='+encodeURIComponent($scope.zhajiSingDatas.title)+'&summary='+encodeURIComponent($scope.zhajiSingDatas.content)+'&pic='+$scope.zhajiSingDatas.shareurlpic;

				}
				
				openInNewWindows(url+param,{width:800,height:800});
			};
		}else{
			$('.erro-tip-text').eq(1).addClass('erro-tip-textnpo').html('暂时没有数据');
		}
	});

	$scope.shareTip = function(){
		$('.sharing-layer').removeClass('is-hidden');

	};
	$scope.shareTipOut = function(){
		$('.sharing-layer').addClass('is-hidden');
	};

}])
//添加札记
.controller('zhajiAdd', ['$rootScope','$scope','MYHTTPAjax','cookie','gloableConfig','localStorageService', function($rootScope,$scope,MYHTTPAjax,cookie,gloableConfig,localStorageService) {
	cookie();
	//补位
	function toDouble(num, n) {  
		var len = num*1;  
		while(len < n) {  
			num = "0" + num;
		}  
		return num;
	} 
	//获取时间
	function getDate(){
		var myDate = new Date();
		return	myDate.getFullYear() + '-' +toDouble((myDate.getMonth()+1),10) + '-' +myDate.getDate();  
	}
	//时间对比
	function duibi(a, b) {
		var arr = a.split("-");
		var starttime = new Date(arr[0], arr[1], arr[2]);
		var starttimes = starttime.getTime();

		var arrs = b.split("-");
		var lktime = new Date(arrs[0], arrs[1], arrs[2]);
		var lktimes = lktime.getTime();

		if (starttimes >= lktimes) {
			return false;
		}
		else
			return true;
	}
	$scope.zhajiAdd = function(){

		var getLocalStorage = localStorageService.get("BAOBAOTONG");
			if(!duibi(getLocalStorage.zhajiTime,getDate())){
				$('.erro-tip-text').eq(1).html('您今天已经发布过一次札记，请不要在发布');
				return false;
			}else{
				getLocalStorage.zhajiTime = getDate();
			}
			

		if($('input[name=title]').val().length<1 || $('input[name=title]').val().length>25){
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.zhaji.title);
			return false;
		}
		if($('textarea').val().length<1){
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.zhaji.content);
			return false;
		}
		var param = {
			title:$('input[name=title]').val(),
			dcontent:$('textarea').val()
		};
		MYHTTPAjax('api.ext.bbw.daily.write',param).then(function(result){
			if (result.status) {
				$rootScope.zhajiDatas.unshift(result.data);
				
				localStorageService.set("BAOBAOTONG",getLocalStorage);
				console.log(localStorageService.get("BAOBAOTONG"));
			}
		});
	};
}])
//案例
.controller('anliUrl', ['$scope','anliData','$stateParams', '$location','MYHTTPAjax', 'gloableConfig','openInNewWindows','cookie',  function($scope, anliData, $stateParams, $location, MYHTTPAjax,gloableConfig,openInNewWindows,cookie) {
	cookie();
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(4).addClass('ui-navbread-active');
	$scope.type = {'1':'寿险','2':'财险'};

	anliData.then(function(result){
		if(result.status){
			$scope.anliDatas = result.data.slice(0,5);
			angular.forEach($scope.anliDatas, function(data, index){
				if(data.sid == $stateParams.id){
					//data.cate = type[data.cate];
					$scope.anliSingDatas = data;
				}
			});
			
			$scope.share = function(event){
				var tag = event.target;

				if($(tag).attr('data-share')=='weibo'){
					var url = 'http://service.weibo.com/share/share.php?',
						appkeyvalue = gloableConfig.appkey.weibo,
						param = 'appkey='+appkeyvalue+'&url='+encodeURIComponent($scope.anliSingDatas.shareurl)+'&title='+encodeURIComponent($scope.anliSingDatas.title)+'&pic='+$scope.anliSingDatas.shareurlpic+'#_loginLayer_'+appkeyvalue;
				}

				if($(tag).attr('data-share')=='qq'){
					var url = 'http://connect.qq.com/widget/shareqq/index.html?',
						param = 'url='+encodeURIComponent($scope.anliSingDatas.shareurl)+'&desc='+encodeURIComponent($scope.anliSingDatas.title)+'&pics='+$scope.anliSingDatas.shareurlpic+'&site='+encodeURIComponent(gloableConfig.name);
				}

				if($(tag).attr('data-share')=='qzone'){
					var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
						param = 'url='+encodeURIComponent($scope.anliSingDatas.shareurl)+'&title='+encodeURIComponent($scope.anliSingDatas.title)+'&summary='+encodeURIComponent($scope.anliSingDatas.content)+'&pics='+$scope.anliSingDatas.shareurlpic;

				}
				
				openInNewWindows(url+param,{width:800,height:800});
			};
		}else{
			$('.erro-tip-text').eq(1).addClass('erro-tip-textnpo').html('暂时没有数据');
		}
	});

	$scope.argument = $location.$$url.replace(/\//g,'');
	//验证
	$scope.checkAnli = function(){
		if($("input").val().length<=25 && $("input").val().length>0){
			var titles = $("input").val();
		}else{
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.zhaji.title);
			return false;
		}

		if($("textarea").val().length > 0){
			var content = $("textarea").val();
		}else{
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.zhaji.content);
			return false;
		}
		return {titles:titles,contents:content}
	};
	//添加案例
	$scope.addAnli = function(){
		var returnData = $scope.checkAnli();
		var param = {
			content:returnData.contents,
			title:returnData.titles,
			cate:$(".anliSelect").val()
		};

		MYHTTPAjax('api.ext.bbw.sucessample.add',param).then(function(result){
			if (result.status) {
				$('.erro-tip-text').eq(1).html(gloableConfig.tips.zhaji.sucess);
				$scope.anliDatas.unshift(result.data);
			}
		});
	};
	$scope.editAnli = function(){
		var returnData = $scope.checkAnli();
		var param = {
			sid:$stateParams.id,
			content:returnData.contents,
			title:returnData.titles,
			cate:$(".anliSelect").val()
		};
		MYHTTPAjax('api.ext.bbw.sucessample.modi',param).then(function(result){
			if (result.status) {
				$('.erro-tip-text').eq(1).html(gloableConfig.tips.anli.editsucess);
			}else{
				$('.erro-tip-text').eq(1).html(gloableConfig.tips.anli.editerror);
			}
		});
	};
	
	$scope.shareTip = function(){
		$('.sharing-layer').removeClass('is-hidden');

	};
	$scope.shareTipOut = function(){
		$('.sharing-layer').addClass('is-hidden');
	};
}])
//明星榜
.controller('mingxingUrl', ['$scope','mingxingData','$stateParams', '$location','cookie', function($scope, mingxingData, $stateParams, $location,cookie) {
	cookie();
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(5).addClass('ui-navbread-active');
	mingxingData.then(function(result){
		//console.log(result.data);
		$scope.mingxingMe = result.data.me;
		//$scope.mingxingRand = result.data.rank;
		//console.log(result.data.rank.slice(9));
		$scope.mxTop10 = result.data.rank.reverse().slice(0,10);
		//console.log($scope.mxTop10);
		$scope.mxTop20 = result.data.rank.reverse().slice(9);
	});
}])
//二维码
.controller('erweimaUrl', ['erweimaData','cookie', function(erweimaData,cookie) {
	cookie();
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(7).addClass('ui-navbread-active');
	erweimaData.then(function(result){
		if(result.status){
			$('#ui-ewm-bw').attr('src',result.data);
		}
	});
}])
//保屋
.controller('baowuUrl', ['$scope','MYHTTPService','cookie','MYHTTPAjax', function($scope, MYHTTPService,cookie,MYHTTPAjax) {
	cookie();
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(6).addClass('ui-navbread-active');
	$scope.editBaowu = function(){
		var param={
			desc:$('textarea').val(),
			skin:'1'
		};

		MYHTTPAjax('api.ext.bbw.social.homemodify',param).then(function(result){
			if (result.status) {
				$('.erro-tip-text').html('保屋修改成功');
			}
		});
	};
}])

//红包
.controller('hongbaoView', ['$scope', '$stateParams', 'hongbaoData', 'MYHTTPAjax', 'gloableConfig','cookie','personsData','$compile', function($scope, $stateParams, hongbaoData,MYHTTPAjax,gloableConfig,cookie,personsData,$compile) {
	cookie();

	personsData.then(function(result){
		if(result.status){
			$scope.viewPerData = result.data;
		}
	});
	
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(8).addClass('ui-navbread-active');

	hongbaoData.then(function(result){
		//console.log(result);
		$scope.usersocre = result.data.usersocre;
		$scope.woodlist = result.data.woodlist;
		var optionwood = [];

		//option 物品
		angular.forEach($scope.woodlist, function(data, index){
			//console.log(data);
			var woodid = data.id,
				title = data.title,
				jsonData = {title:title,woodid:woodid};
			optionwood.push(jsonData);
			$scope.optionwood = optionwood;
			//console.log()
		});
		//$scope.selectedOption = $scope.optionwood[0].woodid;


		if(!$scope.woodlist.length){
			return false;
		}
		$scope.dingXiang = function(type){
			$scope.dingXiangType = type;
			//console.log($('.ui-hb-listview'));
			$('#ui-hb-viewlist').add('.ui-mx-item-left-btn').hide();
			$('.ui-hb-user').show();
		};
		$scope.submitTrue = function(){
			var chk_value =[];    
			$('input[name="woodid"]:checked').each(function(){    
				chk_value.push($(this).val());    
			}); 
			$scope.chkUser = chk_value;

			if(!chk_value.length){
				alert('至少选择一个用户');
				return false;
			}
			//
			$('.ui-hb-user').hide();
			$('#ui-hb-add').show();
			$('.hongbaoradio').show();
		};

		//动态插入options  解决angular option自动插入?的option
		/*var optionsStr = '';
		angular.forEach($scope.woodlist, function(data, index){
			optionsStr += '<option value="'+data.id+'">'+data.title+'</option>';
		});
		$('.ui-hb-select').html(optionsStr);*/

		/*$scope.dxChange = function(x){ //传进来的是woodid
			console.log(x);

			// angular.forEach($scope.woodlist, function(data, index){
			// 	if(data.id == x){
			// 		$('.ui-hb-prices').html('¥'+data.value);
			// 		$('.ui-hb-num').html(data.number);
			// 		$scope.selectWoodId = x;
			// 	}
			// });
		};*/
		//不定向
		$scope.buDingXiang = function(type){
			$scope.dingXiangType = type;
			$('#ui-hb-viewlist').add('.ui-mx-item-left-btn').hide();
			$('.ui-bd-type').show();
			$('.hongbaobox').show();
			$('#ui-hb-add').show();
			$('.ui-hb-addbtn').show();
		};
		//微信新浪选择
		/*$scope.bdxType = function(type){
			$scope.bdxType = type;
			$('.ui-bd-type').hide();
			$('#ui-hb-add').show();
			$('.ui-hb-addbtn').show();
		};*/
		/*var hongBaoCount = 0;
		$scope.bdAddWood = function(){

			hongBaoCount++;
			console.log('hongBaoCount' + hongBaoCount);
			var changeModel = 'selectedOption' + hongBaoCount;
			// $scope.optionwood.splice(1, 1); //删除其值
			console.log($scope.optionwood); // when add , splice the array have in.
			$scope[changeModel] = $scope.optionwood[0].woodid;

			var str = '<ul class="clearfix">'+
	            '<li class="ui-hb-wupin">'+
	                '<select class="ui-hb-select" ng-change="dxChange(changeModel)" ng-model="changeModel">'+
	                    '<option value="{{lists.woodid}}" ng-repeat="lists in optionwood">{{lists.title}}</option>'+
	                '</select>'+
	            '</li>'+
	            '<li class="ui-hb-price ui-hb-prices">¥'+$scope.woodlist[0].value+'2</li>'+
	            '<li class="ui-hb-price ui-hb-num">'+$scope.woodlist[0].number+'</li>'+
	            '<li class="ui-hb-price"><input class="ui-hb-input" type="text" value="1" /></li>'+
	        '</ul>';
        	$('.ui-wood-append').append($compile(str)($scope));
		};*/
		//直接改数字，则选中input
		$scope.focusSlectedInput = function(ev){
			$(ev.target).parents('.hongbaobox').find('input[type="checkbox"]').attr('checked',true);
		};
		//判断红包不能大于库存
		$scope.blurCheckNum = function(ev,n){
			if($(ev.target).val()*1 > n*1){
				$('.erro-tip-text').html('所填红包个数不能大于库存');
				$(ev.target).parents('.hongbaobox').find('input[type="checkbox"]').attr('checked',false);
				return false;
			}else{
				$(ev.target).parents('.hongbaobox').find('input[type="checkbox"]').attr('data-num',$(ev.target).val());
			}
		};
		//提交
		$scope.submitHb = function(){
			var rbnumber=0,infor=[];
			if($scope.dingXiangType == 1){
				rbnumber = 1,
				rbtargetuid = $scope.chkUser[0];
				infor.push({woodid:$('.hongbaoradio input[type=radio]:checked').val(),number:1});
			}else{
				/*angular.forEach($('input[type=text]'), function(data, index){
					rbnumber = rbnumber + data.value*1;
					infor.push({woodid:$scope.selectWoodId,number:data.value})
				});
				//console.log($('input[type=text]'));
				var rbtargetuid = '';*/
				var checkboxChecked = $('input[type=checkbox]:checked');
				if(!checkboxChecked.length){
					$('.erro-tip-text').html('至少选择一种物品');
					return false;
				}else{
					angular.forEach(checkboxChecked,function(o,i){
						rbnumber = rbnumber*1+$(o).attr('data-num')*1;
						infor.push({woodid:$(o).val(),number:$(o).attr('data-num')});
					});
					var rbtargetuid = '';
				}
			}
			//判断红包不能大于库存
			/*if($('.ui-hb-input').val()*1 > $('.ui-hb-num').html()*1){
				$('.erro-tip-text').html('所填红包个数不能大于库存');
				return false;
			}*/
			var param = {
				rbcate: $scope.dingXiangType,
				rbnumber: rbnumber,
				infor: infor,
				rbtargetuid: rbtargetuid
			};

			MYHTTPAjax('api.ext.bbw.redbag.send',param).then(function(result){
				if (result.status) {
					//$('.erro-tip-text').html(result.msg);
					$('.ui-hb-hbPic').show();
					$('#ui-hb-add').hide();
					$scope.hbPic = result.data.rburl;
					console.log(result);
					/*var time = setTimeout(function(){
						window.location.reload();
						clearTimeout(time);
					},1000);*/
					//返回二维码
				}
			});
		};
	});
}])
//仓库
.controller('cangkuUrl', ['$rootScope','$scope','$stateParams','MYHTTPAjax','kucunData','cookie', 'gloableConfig','$location', function($rootScope,$scope,$stateParams,MYHTTPAjax,kucunData,cookie,gloableConfig,$location) {
	cookie();
	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(2).addClass('ui-navbread-active');
	$scope.argument = $location.$$url.replace(/\//g,'');//区分模板
	kucunData.then(function(result){
		if(result.status){
			$rootScope.kucunDataS=[];
			if(!result.data.woodlist.length){
				//$('.erro-tip-text').eq(0).html('没有数据，赶快去添加吧！');
			}else{
				$rootScope.kucunDataS = result.data.woodlist;
				angular.forEach($scope.kucunDataS, function(data, index){
					if(data.id == $stateParams.id){
						$scope.cangkuSingDatas = data;
					}
				});
			}
		}else{
			$('.erro-tip-text').eq(0).html('没有数据，赶快去添加吧！');
		}
	});	

	$scope.checkCangku = function(){
		if(!$("input[name='title']").val()){
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.product.title);
			return false;
		}
		if(!$("input[name='price']").val()*1 || isNaN($("input[name='price']").val()*1)){
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.product.price);
			return false;
		}
		if(!$("input[name='kucun']").val()*1 || isNaN($("input[name='kucun']").val()*1)){
			$('.erro-tip-text').eq(1).html(gloableConfig.tips.product.kucun);
			return false;
		}
		if(!document.getElementById('uploadedfile').files || !document.getElementById('uploadedfile').files[0]){
			$('.erro-tip-text').eq(1).html("请上传图片！"); 
			return false;
		}
		if(!/image\/\w+/.test(document.getElementById('uploadedfile').files[0].type)){ 
	        $('.erro-tip-text').eq(1).html("文件必须为图片！"); 
	        return false; 
	    }
	    if(document.getElementById('uploadedfile').files[0].size / 1024 > 150){
	    	$('.erro-tip-text').eq(1).html('您上传的图片超出了150K的限制');
	    	return false;
	    }
	};

	$scope.cangkuAdd = function(){
		$scope.checkCangku();
		if(!$scope.checkCangku()) return false;
		var reader = new FileReader();

		reader.onload = function(evt){
			//$scope.image = evt.target.result;
			var param = {
				title:$("input[name='title']").val(),
				number:$("input[name='kucun']").val(),
				value:$("input[name='price']").val(),
				//pic:document.getElementById('uploadedfile').files[0],
				pic:[evt.target.result],
				desc:$("textarea").val()
			};
			MYHTTPAjax('api.ext.bbw.wood.input',param).then(function(result){
				if (result.status) {
					$('.erro-tip-text').eq(1).html(gloableConfig.tips.product.addsucess);
					result.data.pic = result.data.pic[0];
					$rootScope.kucunDataS.unshift(result.data);
					$('.erro-tip-text').eq(0).html('');
				}
			});
		}

		reader.readAsDataURL(document.getElementById('uploadedfile').files[0]);
		
	};
	$scope.cangkuEdit = function(){
		$scope.checkCangku();
		if(!$scope.checkCangku()) return false;
		var readers = new FileReader();

		readers.onload = function(evt){
			//$scope.image = evt.target.result;
			var param = {
				title:$("input[name='title']").val(),
				number:$("input[name='kucun']").val(),
				value:$("input[name='price']").val(),
				//pic:document.getElementById('uploadedfile').files[0],
				pic:[evt.target.result],
				desc:$("textarea").val()
			};
			MYHTTPAjax('api.ext.bbw.wood.input',param).then(function(result){
				if (result.status) {
					$('.erro-tip-text').eq(1).html(gloableConfig.tips.product.addsucess);
					result.data.pic = result.data.pic[0];
					$rootScope.kucunDataS.unshift(result.data);
					$('.erro-tip-text').eq(0).html('');
				}
			});
		}

		readers.readAsDataURL(document.getElementById('uploadedfile').files[0]);
	};
	//编辑删除
	var count = 0;
	$scope.deletPer = function(){
		count++;
		if(count%2){
			$('.ui-form-checkbox').css('visibility','visible');
			$('.ui-bottom-toolbar').addClass('ui-bottom-toolbar-visi');
		}else{
			$('.ui-form-checkbox').css('visibility','hidden');
			$('.ui-bottom-toolbar').removeClass('ui-bottom-toolbar-visi');
		}
	};
	//选择和用户跳转间的事件判断
	$scope.checkactive = function(event){
		if(count%2){
			//event.stopPropagation();
			if(!$(event.target).is('input')){
				event.preventDefault();//阻止链接跳转
				var parentClass = $(event.target).parents('.ui-parent-class'),
					nowInput = parentClass.find('input')[0];
				parentClass.removeAttr('href');
				nowInput.checked = !nowInput.checked;
			}
		}else{
			console.log(23);
			var parentClass = $(event.target).parents('.ui-parent-class');
			parentClass.attr('href',parentClass.attr('data-href'));
		}
		/*if(count%2){
			event.preventDefault();//阻止链接跳转
			var nowInput = $(event.target).parents('.ui-parent-class').find('input')[0];

			nowInput.checked = !nowInput.checked;
		}*/
	};
}])
//钱包
.controller('meUrl', ['$rootScope','$scope','MYHTTPAjax','qianbaoData','cookie','gloableConfig', function($rootScope,$scope,MYHTTPAjax,qianbaoData,cookie,gloableConfig) {
	cookie();

	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(1).addClass('ui-navbread-active');
	qianbaoData.then(function(result){
		if(result.status){
			$scope.jifen = result.data.score;
		}
	});
	//充值

	$scope.chargemoney = function(){
		if (!$("input[name='pername']").val()) {
			$('.erro-tip-text').html(gloableConfig.tips.putmoney.name);
			return false;
		};
		if (!$("input[name='money']").val()) {
			$('.erro-tip-text').html(gloableConfig.tips.putmoney.money);
			return false;
		};
		var param = {
			chargechanel:'pc',//充值的渠道
			chargenumber:$("input[name='money']").val(),//充值的数额
			username:$("input[name='pername']").val()
		};
		MYHTTPAjax('api.user.chargemoney',param).then(function(result){
			if (result.status) {
				console.log(result);
				$('.erro-tip-text').html(gloableConfig.tips.putmoney.sucess);
				//$rootScope.kucunDataS.unshift(result.data);
			}
		});
	};
	//提现
	$scope.getmoney = function(){
		if (!$("input[name='pername']").val()) {
			$('.erro-tip-text').html(gloableConfig.tips.getmoney.money);
			return false;
		};
		if (!$("input[name='money']").val()) {
			$('.erro-tip-text').html(gloableConfig.tips.getmoney.money);
			return false;
		};
		//缺少对钱的判断
		var param = {
			getmoneynumber:$('select').val(),//提现种类
			tochanel:$("input[name='money']").val(),//提现的目标金融工具，支付宝或者银行卡。 10是支付宝。11是银行卡
			toid:$("input[name='pername']").val(),//支付宝或者银行卡的帐号 
		};
		MYHTTPAjax('api.user.getmoney',param).then(function(result){
			if (result.status) {
				$('.erro-tip-text').html(gloableConfig.tips.getmoney.sucess);
				//$rootScope.kucunDataS.unshift(result.data);
			}
		});
	};
}])
//提现记录
.controller('tixianUrl', ['$scope','tixianData','cookie','gloableConfig', function($scope,tixianData,cookie,gloableConfig) {
	cookie();
	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(1).addClass('ui-navbread-active');
	tixianData.then(function(result){
		if (result.status) {
			if(!result.data.length){
				$('.erro-tip-text').html('没有提现记录');
			}else{
				$scope.tixianJilu = result.data;
			}
		}else{
			$('.erro-tip-text').html(result.msg);
		}
	});

}])
//关注
.controller('guanzhuUrl', ['$scope','guanzhuData','cookie', function($scope,guanzhuData,cookie) {
	cookie();
	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(3).addClass('ui-navbread-active');
	guanzhuData.then(function(result){
		if(result.data){
			//console.log(result.data);
			if(result.data.listfo.data.length>0){
				$scope.gzlistfo = result.data.listfo.data;
			}
			if (result.data.listbefo.data.length>0) {
				$scope.gzlistbefo = result.data.listbefo.data;
			}
		}
	});
}])
//反馈
.controller('fankuiUrl', ['$scope', 'cookie','MYHTTPAjax', function($scope, cookie, MYHTTPAjax) {
	cookie();
	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(4).addClass('ui-navbread-active');

	$scope.fankui = function(){
		if(!$('textarea').val()){
			$('.erro-tip-text').html('不能为空');
			return false;
		}
		MYHTTPAjax('api.ext.bbw.my.feedback',{feedback:$('textarea').val()}).then(function(result){
			if(result.status){
				$('.erro-tip-text').html(result.msg);
			}
		});
	};

}])
//关于我们
.controller('aboutUrl', ['$scope', 'cookie', function($scope, cookie) {
	cookie();
	$('.ui-nav a').removeClass('ui-nav-active').eq(1).addClass('ui-nav-active');
	$('.ui-navbread a').removeClass('ui-navbread-active').eq(5).addClass('ui-navbread-active');
}])
;
















