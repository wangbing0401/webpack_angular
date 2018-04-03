/**
 * Created by WB on 2017/11/9.
 */
const angular = require('angular');
angular.module('loginModule', []);
angular.module('loginModule').controller('loginController', ['$scope', 'common_dictionary', '$timeout', function ($scope, common_dictionary, $timeout) {
    $scope.name = 'wangbing';
    $scope.test = '测试一下';
    common_dictionary.get_area_list({parentId:0}, function (result) {

    });
}]);