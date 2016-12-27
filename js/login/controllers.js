'use strict';
angular.module('mainApp.controller', ['LocalStorageModule'])
.controller('login', ['$scope','MYHTTPAjax','MYHTTPService','gloableConfig','localStorageService', function($scope,MYHTTPAjax,MYHTTPService,gloableConfig,localStorageService) {
	//alert
	if(localStorageService.get("BAOBAOTONG")){
		MYHTTPAjax('api.user.auth').then(function(result){
			if(result.status){
				location.href = "index.html#/index";
				return false;
			}
		});
	};
	$scope.logins = function(){
		if(!$('input[name=name]').val()){
			alert('登录名不能为空');
			return false;
		}
		if(!$('input[name=password]').val().length==8){
			alert('密码长度8位');
			return false;
		}
		//是否记住密码
		/*if(!$('input[name=remember]').val().is(":checked")){
			
		}*/
		var req={
			method:'api.user.login',
	        lang: MYHTTPService.lang,
	        tz: MYHTTPService.tz,
	        longitude: MYHTTPService.longitude,
	        latitude: MYHTTPService.latitude,
	        machinecate: MYHTTPService.machinecate,
	        machineos: MYHTTPService.machineos,
	        machineversion: MYHTTPService.machineversion,
			comefromplatform: 1001,
	        username:$('input[name=name]').val(),
			password:$('input[name=password]').val()
		};

		MYHTTPService.post(gloableConfig.ajxUr,req,MYHTTPService.heads).then(function(result){
			if (result.status) {
				//console.log(result);
				location.href = "index.html#/index";
				localStorageService.remove('BAOBAOTONG');
				localStorageService.set('BAOBAOTONG',{
					uid:result.data.uid,
					token:result.data.token,
					zhajiTime:'2015-10-23'
				});
				
				/*$cookieStore.remove('BAOBAOTONG');
				$cookieStore.put('BAOBAOTONG',{
					uid:result.data.uid,
					token:result.data.token
				});*/

			}
		});
	};
}])
.controller('helper', ['$scope','MYHTTPAjax','MYHTTPService','gloableConfig', function($scope,MYHTTPAjax,MYHTTPService,gloableConfig) {
	//alert
	$scope.getCooki = function(){
		var pagram = {
			sfzh:$('input[name=name]').val(),
			zyzh:$('input[name=zhiye]').val()
		};
		MYHTTPAjax('api.user.forgetpassword',pagram).then(function(result){
			result.status=1;
			if(result.status){
				$('.helper-repas').hide();
				$('.helper-con').show();
				console.log(result);
			}
		});
	};
	//验证码
	$scope.getCookis = function(){
		var pagram = {
				username:$('input[name=tel]').val(),
				way:"reg"
			};
			MYHTTPAjax('api.user.getauthcode',pagram).then(function(result){
				result.status=1;
				if(result.status){
					
				}
			});
		};
	//登录
	$scope.putlogins = function(){
		var pagram = {
			username:$('input[name=tel]').val(),
			sfzh:$('input[name=name]').val(),
			zyzh:$('input[name=zhiye]').val(),
			authcode:$('input[name=code]').val(),
			newpassword:$('input[name=pas]').val(),
			newpasswordrepeat:$('input[name=repas]').val()
		};
		MYHTTPAjax('api.user.forgetpassword',pagram).then(function(result){
			result.status=1;
			if(result.status){
				
			}
		});
	};
}]);