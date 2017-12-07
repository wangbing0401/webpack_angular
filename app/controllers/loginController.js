/**
 * Created by WB on 2017/11/9.
 */
const angular = require('angular');
angular.module('loginModule', []);
angular.module('loginModule').controller('loginController', ['$scope', function ($scope) {
    $scope.name = 'wangbing';
}]);