angular.module('App').factory('apiHelper', function ($filter,$http) {
    var host = 'http://54.255.173.168:8080/';
    
    var LIMIT_PER_PAGE = 10;
    var apiHelper = {
        user: {
            username: "demo@test.com",
            password: "abcd1234"
        },
        login: function (user) {
            return $http.post(host + 'login',
                {
                    "username": user.username,
                    "password": user.password
                }
            );
        },
        changePassword: function (newPass) {
            return $http.post(host + 'private/password/change',
                {
                    "username": apiHelper.user.username,
                    "password": apiHelper.user.password,
                    "new_password": newPass
                }
            );
        },
        logout: function () {
            return $http.post(host + 'logout',
                {}
            );
        },
        getStations: function () {
            return $http.get(host + 'private/station');
        },
        getFields: function (stationId) {
            return $http.get(host + 'private/field?station_id=' + stationId);
        },
        getFieldInfor: function (fieldCode) {
            return $http.get(host + 'private/measurement?field_code=' + fieldCode);
        },
        getMeasure: function (fieldCode, date) {
            return $http.get(host + 'private/measurement/paging?field_code=' + fieldCode + '&date=' + date)
        },
        getMeasureWithLimit: function (fieldCode, date) {
            return $http.get(host + 'private/measurement/paging?field_code=' + fieldCode + '&date=' + date + '&limit=' + LIMIT_PER_PAGE)
        },
        convertServerTime: function (localDate) {
            return new Date(localDate.valueOf() + localDate.getTimezoneOffset() * 60000);
        },
        formatDate: function (item_date) {
            //2016-06-22T23:59:59
            return $filter('date')(item_date, "yyyy-MM-ddTHH:mm:ss");
        },
        convertServerTimeS: function (time){
           return apiHelper.formatDate(apiHelper.convertServerTime(time));
        },
        needLoadMore : function(count){
            return count%LIMIT_PER_PAGE == 0;
        },
        checkPass: function(pass){
            return pass == apiHelper.user.password;
        }
    }
    return apiHelper;
});
