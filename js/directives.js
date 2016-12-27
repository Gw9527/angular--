'use strict';
angular.module('mainApp.directive', [])
.directive('breadnav',function(){
    return {  
        restrict: 'EA',
        //require: '^zhajiview',
        //templateUrl: 'tpl/zhaji/zhan.zhaji.add.html',
        controller: function($scope, $element ,$attrs, $location){
            
        },
        link: function(scope, element, attrs) {

            scope.getContentUrl = function() {
                if(!/^\/me/g.test(window.location.href.split('#')[1])){
                    return 'tpl/kehu/zhannav.html';
                }else{
                    return 'tpl/me/menav.html';
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>',
        replace: true
    }
})
.directive('zhanper',function(){
    return {  
        restrict: 'EA',
        controller: function($scope, $element ,$attrs, $location){
            
        },
        link: function(scope, element, attrs) {

            scope.getContentUrl = function() {
                if(/^(\/kehu|\/group|\/index|\/personadd)/g.test(window.location.href.split('#')[1])){
                    return 'tpl/kehu/zhanper.html';
                }else{
                    return '';
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>',
        replace: true
    }
})
.directive('mion',function(){
	return {  
        restrict: 'EA',
        templateUrl: 'tpl/renwu/zhan.renwu.view.html',
        replace: true,
        controller: function($scope,renwuData,$stateParams,MYHTTPAjax,cookie){
            cookie();
            $('.ui-navbread a').removeClass('ui-navbread-active').eq(2).addClass('ui-navbread-active');
            renwuData.then(function(result){
                if(result.status){
                    $scope.daily = result.data.daily.concat(result.data.primary);
                    //console.log(daily);
                    if($stateParams.id == ''){
                        $scope.renwu = $scope.daily[0];
                    }
                    for(var i=0; i<$scope.daily.length; i++){
                        if($scope.daily[i].missionid == $stateParams.id){
                            $scope.renwu = $scope.daily[i];
                        }
                    }
                }else{
                    $('.erro-tip-text').addClass('erro-tip-textnpo').html('暂时没有数据');
                }
            });

            $scope.doRenwu = function(){
                MYHTTPAjax('api.ext.bbw.task.read',{tid:$stateParams.id}).then(function(result){
                    if (result.status) {
                        angular.forEach($scope.daily, function(data, index){
                            if(data.missionid==$stateParams.id){
                                $scope.daily.splice(index,1);
                            }
                        });
                    }
                });
            };
        }
    }
})
.directive('zhajiview',function(){
	return {  
        restrict: 'EA',
        //require: '^zhajiview',
        //templateUrl: 'tpl/zhaji/zhan.zhaji.add.html',
        controller: function($scope, $element ,$attrs, $location){
            //console.log($location.$$url);
            
        },
        link: function(scope, element, attrs) {
            //console.log(attrs.localsrc);
            var localsrc = attrs.localsrc.charAt(attrs.localsrc.length - 1),
                zhajiSingDatas = scope.zhajiSingDatas;
            scope.getContentUrl = function() {
                if(!isNaN(localsrc)){
                    return 'tpl/zhaji/zhan.zhaji.view.html';
                }else{
                    if(attrs.localsrc=='zhajiadd'){
                        return 'tpl/zhaji/zhan.zhaji.add.add.html';
                    }else{
                        return 'tpl/zhaji/zhan.zhaji.add.html';
                    }
                }
                
                
            }
        },
        template: '<div ng-include="getContentUrl()"></div>',
        replace: true
    }
})
.directive('anliview',function(){
    return {  
        restrict: 'EA',
        //require: '^zhajiview',
        //templateUrl: 'tpl/zhaji/zhan.zhaji.add.html',
        controller: function($scope, $element ,$attrs, $location){
            //console.log($location.$$url);
            
        },
        link: function(scope, element, attrs) {
            //console.log(attrs.localsrc);
            var localsrc = attrs.localsrc.charAt(attrs.localsrc.length - 1),
                zhajiSingDatas = scope.zhajiSingDatas;
            scope.getContentUrl = function() {
                if(!isNaN(localsrc)){
                    if(/edit/.test(attrs.localsrc)){
                        return 'tpl/anli/zhan.anli.edit.html';
                    }else{
                        return 'tpl/anli/zhan.anli.view.html';
                    }
                    
                }else{
                    if(attrs.localsrc=='anliadd'){
                        return 'tpl/anli/zhan.anli.add.add.html';
                    }else{
                        return 'tpl/anli/zhan.anli.add.html';
                    }
                }                
            }
        },
        template: '<div ng-include="getContentUrl()"></div>',
        replace: true
    }
})
.directive('cangku',function(){
    return {  
        restrict: 'EA',
        //require: '^zhajiview',
        //templateUrl: 'tpl/zhaji/zhan.zhaji.add.html',
        controller: function($scope, $element ,$attrs, $location){
            //console.log($location.$$url);
            
        },
        link: function(scope, element, attrs) {
            var localsrc = attrs.localsrc.charAt(attrs.localsrc.length - 1),
                zhajiSingDatas = scope.zhajiSingDatas;
            scope.getContentUrl = function() {
                if(!isNaN(localsrc)){
                    if(/edit/.test(attrs.localsrc)){
                        return 'tpl/me/cangku/edit.html';
                    }else{
                        return 'tpl/me/cangku/view.html';
                    }
                    
                }else{
                    if(attrs.localsrc=='mecangkuadd'){
                        return 'tpl/me/cangku/add.add.html';
                    }else{
                        return 'tpl/me/cangku/add.html';
                    }
                }
            };
        },
        template: '<div ng-include="getContentUrl()"></div>',
        replace: true
    }
});


