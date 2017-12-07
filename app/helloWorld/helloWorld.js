/**
 * Created by WB on 2017/10/25.
 */
module.exports = function(ngModule) {
    //定义指令，对应页面中的<hello-world></hello-world>
    ngModule.directive('helloWorld', function () {
        return {
            //元素(element)
            restrict: 'E',
            scope: {},
            templateUrl: './app/helloWorld/helloWorld.html',
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
                console.log('this',this);
                vm.greeting = '你好，我是Alan，很高兴见到你!';
            }
        }
    });
}