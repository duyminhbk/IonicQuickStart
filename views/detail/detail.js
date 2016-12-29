'Use Strict';
angular.module('App').controller('detailController', function ($scope, $state,$stateParams, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, Utils, apiHelper, chartUtils) {
  // alert(JSON.stringify($stateParams.field_code));
  
  $scope.showChart = true;
  $scope.lineData = {};
  $scope.dateRequest = new Date();

  $scope.items = [];

  $scope.logOut = function () {
    // log out
    apiHelper.logout().then(
      function (success) {
        $location.path("/login");
      },
      function (fail) {
        Utils.showErr(fail);
      });
  };

  $scope.initDetail = function () {
    // fetch data from server with start date time
    $scope.field_code = $stateParams.field_code;
    $scope.refeshData();
  };

  var fetchData = function (time, callback) {
    // fetch data from server 
    // data format 
    // {
    //   "field_code": "4CC378DB00E005A695B38F14F98B60F4",
    //   "measured_date": "2016-07-29T17:10:30",
    //   "volume": 18010
    // }
    apiHelper.getMeasureWithLimit($scope.field_code, time).then(
      function (response) {
        callback(response.data.data);
      },
      function (error) {
        Utils.showErr(error);
        callback([
          {
            "field_code": "",
            "measured_date": "",
            "volume": 0
          }
        ]);
      }
    )
  };

  $scope.refeshData = function () {
    // reset and re fetch data
    var d = $scope.dateRequest;
    d.setHours(23, 59, 59);

    Utils.show();

    fetchData(apiHelper.formatDate(d),
      function (data) {
        Utils.hide();
        $scope.items = data;
        updateLineData();
      }
    );
  };

  var updateLineData = function(){
    $scope.lineData = chartUtils.genLineChart($scope.items);
  }

  $scope.moreDataCanBeLoaded = function () {
    // check exist data to load more
    return apiHelper.needLoadMore($scope.items.length);
  };

  $scope.loadMore = function () {
    if ($scope.items.length > 0) {
      var d = $scope.items[$scope.items.length-1].measured_date;
      fetchData(apiHelper.formatDate(d),
        function (data) {
          $scope.items = $scope.items.concat(data);
          updateLineData();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      );
    }
  }

  $scope.chartOption = chartUtils.option;
  
  $scope.updateMode = function(){
    $scope.showChart = !$scope.showChart;
  }



}
);
