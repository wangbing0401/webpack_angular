/**
 * Created by WB on 2017/10/25.
 */
//引入angular
require('jquery');
require('bootstrap');
const angular = require('angular');
require('./js/angular/ocLazyLoad.min');
const routers = require('./ui-router');
const servers = require('./servers');
const config = require('./config');
//定义一个angular模块
var ngModule = angular.module('app',['oc.lazyLoad', 'routers', 'servers', 'config']);

//引入指令文件
require('./helloWorld/helloWorld.js')(ngModule);