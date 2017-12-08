/**
 * Created by WB on 2017/11/9.
 */
const angular = require('angular');
require('angular-resource');
const servers = angular.module('servers', ['ngResource']);

//公共服务,处理网络请求异常或者程序异常等等情况
// params{result, status, headers, config, paramsObj}
servers.factory("handleHttpError", ['$state', function($state){
    return {
        deal_app_error: function(params) {
            if (!params.result) {
                console.log("接口报错或者没有success字段");
                params && params["paramsObj"] && (params["error_code"] = "app_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
                return false;
            }
            return true;
        },
        deal_network_error: function(params){
            if (!localStorage.user_token){
                $state.go('login');
                return;
            }
            // myself_alert.dialog_show('错误码'+params.status);
            params && params["paramsObj"] && (params["error_code"] = "network_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
            return false;
        }
    }
}]);
servers.factory('httpBase', ['$http', 'handleHttpError', 'http_url', '$state', function($http, handleHttpError, http_url, $state){
    return{
        request: function(paramsObj){
            var requestObj = {method: paramsObj.method, url:http_url+paramsObj.url}
            if (paramsObj.method == "GET" || paramsObj.method == 'DELETE'){
                requestObj.params = paramsObj.params;
            }else {
                requestObj.data = paramsObj.params;
            }
            requestObj.headers = {'Authorization':localStorage.user_token};
            $http(requestObj).then(function(result,status,headers,config){
                var handleResult = {result: result,status: status,headers: headers,config:config, paramsObj:paramsObj};
                if(handleHttpError.deal_app_error(handleResult)){
                    paramsObj["successDo"] && paramsObj["successDo"](handleResult.result, handleResult);
                }
            }).catch(function(result,status,headers,config){
                handleHttpError.deal_network_error({result: result,status: status,headers: headers,config:config, paramsObj:paramsObj});
            })
        },


        get: function(paramsObj){
            paramsObj.method = "GET";
            this.request(paramsObj);
        },

        post: function(paramsObj, url, params, successFunc, errorFunc, alwaysFunc){
            paramsObj.method = "POST";
            this.request(paramsObj);
        },
        put: function(paramsObj){
            paramsObj.method = "PUT";
            this.request(paramsObj);
        },
        patch: function (paramsObj) {
            paramsObj.method = "PATCH";
            this.request(paramsObj);
        },
        delete: function(paramsObj){
            paramsObj.method = "DELETE";
            this.request(paramsObj);
        }
    }
}]);

servers.factory('common_dictionary', ['httpBase', function (httpBase) {
    return{
        get_area_list:function (params, successDo, errorDo) {
            httpBase.get({
                url: '/area/api/v1/area',
                params: params,
                successDo: successDo,
                errorDo: errorDo
            });
        }
    }
}]);

module.exports = servers;