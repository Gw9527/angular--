'use strict';

angular.module('mainApp.services', ['LocalStorageModule'])
.factory('cookie',['localStorageService','MYHTTPAjax',function(localStorageService,MYHTTPAjax){
	return function(){
		if(localStorageService.get("BAOBAOTONG")){
			MYHTTPAjax('api.user.auth').then(function(result){
				if(!result.status){
					location.href = "login.html#/login";
					return false;
				}
			});
		}else if(!localStorageService.get("BAOBAOTONG")){
			location.href = "login.html#/login";
		};
	}
}])
.factory('openInNewWindows', function(){
	
	return function(url, h) {
		        h = h || {};
		        var j = h.width || 500, f = h.height || 360;
		        var g = $.extend({}, {width: j,height: f,toolbar: 0,location: 0,resizable: 1,scrollbars: "yes",left: h.left || (screen.width - j) / 2,top: h.top || (screen.height - f) / 2}, h);
		        window.open(url, "SocialSharing", $.param(g).replace(/&/g, ","))
		    }
})
.factory('MYHTTPService', ['localStorageService','$http', '$q','$rootScope', '$window' ,function(localStorageService,$http, $q){
	var positions = {
		longitude:'经度',
		latitude:'纬度'
	};
	function getLocation(){
	   if(navigator.geolocation){
	       //浏览器支持geolocation
	       navigator.geolocation.getCurrentPosition(onSuccess,onError);
	       
	   }else{
	       //浏览器不支持geolocation
	   }
	}
	//成功时
	function onSuccess(position){
		//返回用户位置
		//经度
		positions.longitude =position.coords.longitude;
		//纬度
		positions.latitude = position.coords.latitude;
		//console.log(positions);
	}

	//失败时
	function onError(error){
		positions.longitude = '经度';
		positions.latitude = '纬度';
		/*switch(error.code){
			case 1:
				alert("位置服务被拒绝");
				break;

			case 2:
				alert("暂时获取不到位置信息");
				break;

			case 3:
				alert("获取信息超时");
				break;

			case 4:
				alert("未知错误");
				break;
		}*/

	}
	if(navigator.userAgent.indexOf("Chrome") > -1) getLocation();
    var ret = {
		heads: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		'httpurl': 'http://api.xiuyetang.com/router.php', //公共请求地址
		'lang': 'javascript',
		'tz': '客户端时间',
		'longitude': positions.longitude,
		'latitude': positions.latitude,
		'machinecate':'pc',
		'machineos':'机器系统',
		'machineversion':'机器系统版本',
		'uid':(localStorageService.get("BAOBAOTONG") && localStorageService.get("BAOBAOTONG").uid) || '',
		'token':(localStorageService.get("BAOBAOTONG")&& localStorageService.get("BAOBAOTONG").token) || '',
      	post: function(httpurl, formData, heads) { //发出post请求
	        return $http({
				url: httpurl,
				method: "POST",
				headers: heads,
				data: formData,
				// data: formData
				}).then(
					function (response) {
						if (typeof response.data === 'object') {
							//console.log(response.data);
							return response.data;
						} else {
							//console.log(response.data);
							return $q.reject(response.data);
						}
					},
					function (response) {// something went wrong
						console.log('promise wrong', response);

						return $q.reject(response.data);
					},
					function (response) {
						console.log('promise', data.data);
					}
				);
      	},
      
		get: function(httpurl) { //发出get请求
	        $http({
	           url: httpurl,
	           method: "GET",
	           headers: heads,
	        })    
	        .success(function (data) {
	            console.log('success');
	            console.log(data);
	            //window.localStorage.emailVerified = data.emailVerified;
	            //window.localStorage.sessionToken = data.sessionToken;
	            //window.localStorage.mobilePhoneVerified = data.mobilePhoneVerified;
	            return data;
	         })
	        .catch(function (e) {
	            console.log('faile');
	            console.log(e);
	          return e;
	        });
		},
    };
    return ret;
}])
.factory('MYHTTPAjax', ['MYHTTPService' ,'gloableConfig' ,function(MYHTTPService,gloableConfig){
	return function(method,info){
			var req={
				method:method,
				lang: MYHTTPService.lang,
				tz: MYHTTPService.tz,
				longitude: MYHTTPService.longitude,
				latitude: MYHTTPService.latitude,
				machinecate: MYHTTPService.machinecate,
				machineos: MYHTTPService.machineos,
				machineversion: MYHTTPService.machineversion,
				comefromplatform: 1001,
				uid: MYHTTPService.uid,
				token: MYHTTPService.token
			}
			if(info){
				for(var attr in info){
					req[attr] = info[attr];
				}
			}
			return MYHTTPService.post(gloableConfig.ajxUr,req,MYHTTPService.heads);
		}
}])
//客户
.service( 'personsData', [ 'MYHTTPAjax',function( MYHTTPAjax)  {
	return MYHTTPAjax('api.ext.bbw.crm.list');
}])
//群列表
/*.service( 'groupsData', [ 'gloableConfig','MYHTTPService',function( gloableConfig, MYHTTPService ){
	
	var req={
		method:'api.ext.bbw.crm.listgroup',
        lang: MYHTTPService.lang,
        tz: MYHTTPService.tz,
        longitude: MYHTTPService.longitude,
        latitude: MYHTTPService.latitude,
        machinecate: MYHTTPService.machinecate,
        machineos: MYHTTPService.machineos,
        machineversion: MYHTTPService.machineversion,
		comefromplatform: 1001,
        uid: MYHTTPService.uid,
		token: MYHTTPService.token
	};

	return MYHTTPService.post(gloableConfig.ajxUr,req,MYHTTPService.heads);

}])*/

//任务
.service( 'renwuData', [ 'gloableConfig','MYHTTPService',function( gloableConfig,MYHTTPService) {
	var req={
		method:'api.ext.bbw.task.list',
        lang: MYHTTPService.lang,
        tz: MYHTTPService.tz,
        longitude: MYHTTPService.longitude,
        latitude: MYHTTPService.latitude,
        machinecate: MYHTTPService.machinecate,
        machineos: MYHTTPService.machineos,
        machineversion: MYHTTPService.machineversion,
        uid: MYHTTPService.uid,
		token: MYHTTPService.token,
		comefromplatform: 1001
	};

	return MYHTTPService.post(gloableConfig.ajxUr,req,MYHTTPService.heads);
}])
//札记
/*.service( 'zhajiData', [ 'gloableConfig','MYHTTPService',function( gloableConfig, MYHTTPService) {

	var req={
		method:'api.ext.bbw.daily.list',
        lang: MYHTTPService.lang,
        tz: MYHTTPService.tz,
        longitude: MYHTTPService.longitude,
        latitude: MYHTTPService.latitude,
        machinecate: MYHTTPService.machinecate,
        machineos: MYHTTPService.machineos,
        machineversion: MYHTTPService.machineversion,
        uid: MYHTTPService.uid,
		token: MYHTTPService.token,
		comefromplatform: 1001,
		page:0
	};

	return MYHTTPService.post(gloableConfig.ajxUr,req,MYHTTPService.heads);

}])*/
//案例
.service( 'anliData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.sucessample.list',{page:0});
}])
//明星mingxingData
.service( 'mingxingData', [ 'MYHTTPAjax',function( MYHTTPAjax){
	return MYHTTPAjax('api.ext.bbw.social.rank',{rankcate:0});
}])
//二维码
.service( 'erweimaData', [ 'MYHTTPAjax',function( MYHTTPAjax){
	return MYHTTPAjax('api.ext.bbw.my.qrcode');
}])
//红包物品list
.service( 'hongbaoData', [ 'MYHTTPAjax',function(MYHTTPAjax){
	return MYHTTPAjax('api.ext.bbw.wood.list');	
}])
//保屋
/*.service( 'anliData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.sucessample.list');	
}])*/
//仓库
.service( 'kucunData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.wood.list',{page:0});
}])
//钱包
.service( 'qianbaoData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.my.wallet');
}])
//提现记录
.service( 'tixianData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.my.getmoneyhistory');
}])
//兑换
.service( 'duihuanData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.my.wallet');
}])
//关注
.service( 'guanzhuData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.social.allfolw');
}])
//意见反馈
.service( 'fankuiData', [ 'MYHTTPAjax',function( MYHTTPAjax) {
	return MYHTTPAjax('api.ext.bbw.my.feedback');
}])
;


