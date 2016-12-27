function c(str){
  console.log(str);
}
$('.ui-allcontent-container').height($(window).height()-61);
angular.module('mainApp', ['ui.router', 'mainApp.controller','mainApp.directive','mainApp.services','mainApp.configs']).

config(['$stateProvider', '$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/index");
  $stateProvider
  .state('index', {
    url: '/index',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/zhanview.html',
            controller: 'zhanpers'
        }
	}
  })
  .state('perview', {
    url: '/kehu/:id',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/perview.html',
            controller: 'zhanpers'
        }
	}
  })
  .state('zhanPerEdit', {
    url: '/kehu/edit/:id',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/zhan.per.edit.html',
            controller: 'zhanpers'
        }
	}
  })
  .state('zhanPerAdd', {
    url: '/personadd',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/zhan.per.add.add.html',
            controller: 'zhanpers'
        }
	}
  })
  .state('groupAdd', {
    url: '/groupadd',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/zhan.per.add.group.html',
            controller: 'zhanpers'
        }
	}
  })
  .state('groupView', {
    url: '/group/:id',
    views: {
	    'threeCols': {  
            templateUrl: 'tpl/kehu/zhan.per.view.group.html',
            controller: 'groupView'
        }
	}
  })
  .state('renwuUrl', {
      url: '/renwu/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/renwu/zhan.renwu.html',
              controller: ''
          }
      }
  })
  .state('zhajiUrl', {
      url: '/zhaji',
      views: {
        'contentView': {  
              templateUrl: 'tpl/zhaji/zhan.zhaji.list.html',
              controller: 'zhajiUrl'
          }
      }
  })
  .state('zhajiAdd', {
      url: '/zhaji/add',
      views: {
        'contentView': {  
              templateUrl: 'tpl/zhaji/zhan.zhaji.list.html',
              controller: 'zhajiUrl'
          }
      }
  })
  .state('zhajiView', {
      url: '/zhaji/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/zhaji/zhan.zhaji.list.html',
              controller: 'zhajiUrl'
          }
      }
  })
  .state('anliUrl', {
      url: '/anli',
      views: {
        'contentView': {  
              templateUrl: 'tpl/anli/zhan.anli.list.html',
              controller: 'anliUrl'
          }
      }
  })
  .state('anliAdd', {
      url: '/anli/add',
      views: {
        'contentView': {  
              templateUrl: 'tpl/anli/zhan.anli.list.html',
              controller: 'anliUrl'
          }
      }
  })
  .state('anliEdit', {
      url: '/anli/edit/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/anli/zhan.anli.list.html',
              controller: 'anliUrl'
          }
      }
  })
  .state('anliView', {
      url: '/anli/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/anli/zhan.anli.list.html',
              controller: 'anliUrl'
          }
      }
  })
  .state('mingxingUrl', {
      url: '/mingxing',
      views: {
        'contentView': {  
              templateUrl: 'tpl/mingxing/zhan.mingxing.view.html',
              controller: 'mingxingUrl'
          }
      }
  })
  .state('erweimaUrl', {
      url: '/erweima',
      views: {
        'contentView': {  
              templateUrl: 'tpl/erweima/zhan.erwei.view.html',
              controller: 'erweimaUrl'
          }
      }
  })
  .state('baowuUrl', {
      url: '/baowu',
      views: {
        'contentView': {  
              templateUrl: 'tpl/baowu/zhan.baowu.html',
              controller: 'baowuUrl'
          }
      }
  })
  .state('baowuAdd', {
      url: '/baowu/add',
      views: {
        'contentView': {  
              templateUrl: 'tpl/baowu/zhan.baowu.edit.html',
              controller: 'baowuUrl'
          }
      }
  })
  .state('hongbaoView', {
      url: '/hongbao',
      views: {
        'contentView': {  
              templateUrl: 'tpl/hongbao/zhan.hongbao.view.html',
              controller: 'hongbaoView'
          }
      }
  })
  .state('cangkuAdd', {
      url: '/me/cangku/add',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/cangku/list.html',
              controller: 'cangkuUrl'
          }
      }
  })
  .state('cangkuView', {
      url: '/me/cangku/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/cangku/list.html',
              controller: 'cangkuUrl'
          }
      }
  })
  .state('cangkuEdit', {
      url: '/me/cangku/edit/:id',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/cangku/list.html',
              controller: 'cangkuUrl'
          }
      }
  })
  .state('cangkuUrl', {
      url: '/me/cangku',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/cangku/list.html',
              controller: 'cangkuUrl'
          }
      }
  })

  .state('meView', {
      url: '/me',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/me.view.html',
              controller: 'meUrl'
          }
      }
  })
  .state('chongzhi', {
      url: '/me/chongzhi',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/chongzhi/chongzhi.html',
              controller: 'meUrl'
          }
      }
  })
  .state('tixian', {
      url: '/me/tixian',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/tixian/tixian.html',
              controller: 'meUrl'
          }
      }
  })
  .state('tixianjilu', {
      url: '/me/tixianjilu',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/tixian/tixianjilu.html',
              controller: 'tixianUrl'
          }
      }
  })
  .state('guanzhuUrl', {
      url: '/me/guanzhu',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/guanzhu/view.html',
              controller: 'guanzhuUrl'
          }
      }
  })
  .state('duihuanUrl', {
      url: '/me/duihuan',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/duihuan.html',
              controller: 'duihuanUrl'
          }
      }
  })
  .state('fankuiUrl', {
      url: '/me/fankui',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/fankui/fankui.html',
              controller: 'fankuiUrl'
          }
      }
  })
  .state('aboutUrl', {
      url: '/me/about',
      views: {
        'contentView': {  
              templateUrl: 'tpl/me/about/about.html',
              controller: 'aboutUrl'
          }
      }
  })
;


  //修改ajax发送数据格式  -----begin
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
  //修改发送数据格式-------end

}]);

angular.bootstrap(document, ['mainApp']);