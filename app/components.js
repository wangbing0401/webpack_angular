/**
 * Created by WB on 2017/11/9.
 */
const angular = require('angular');
const components = angular.module('components', []);

components.component('helloWorld', {
    bindings:{
        greeting:'='
    },
    controller: function () {
        var self = this;
    },
    templateUrl:'./app/template/components/helloWorld.html'
});

module.exports = components;