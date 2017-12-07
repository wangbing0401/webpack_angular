/**
 * Created by WB on 2017/10/26.
 */
const angular = require('angular');
require('angular-ui-router');
const router = angular.module('routers', ['ui.router']);
router.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
    angular.controller = $controllerProvider.register;
    angular.directive = $compileProvider.directive;
    angular.filter = $filterProvider.register;
    angular.factory = $provide.factory;
    angular.service = $provide.service;
    angular.constant = $provide.constant;

    $stateProvider.state('login', {
        url:'/login',
        templateUrl: './app/template/login.html',
        controller:'loginController',
        resolve:{
            load: ['$q','$ocLazyLoad',function ($q,$ocLazyLoad) {
                return $q(function(resolve){
                    //下面这一行写法是webpack在需要的时候才下载依赖的模块，[具体看这里][2]
                    require.ensure([], function(){
                        //这里只是依赖了一个控制器文件，但是这个文件里面你可以import很多其他的依赖
                        const my_module = require('./controllers/loginController');

                        //加载模块名为xxx.bg.login的模块，具体是什么作用没弄明白，请高手解答
                        $ocLazyLoad.load({name: 'loginModule'});

                        //promise 的成功回调，不返回出去参数也没关系，因为在login.contorller.js里面已经注册了LoginCtrl
                        resolve(my_module.controller);
                    });
                });
            }]
        }
    });
    $urlRouterProvider.otherwise('/login');
}]);

module.exports = router;