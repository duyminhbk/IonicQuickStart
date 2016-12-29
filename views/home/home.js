'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, Utils, apiHelper, chartUtils) {
  $scope.user = apiHelper.user;
  $scope.data = {};
  $scope.logOut = function () {
    apiHelper.logout().then(
      function (success) {
        $location.path("/login");
      },
      function (fail) {
        Utils.showErr(fail);
      });

  };
  $scope.goSetting = function(){
    $location.path("/setting");
  };
  $scope.initHome = function () {
    apiHelper.getStations().then(
      function (success) {
        $scope.stations = success.data.data;
      },
      function (error) { 
        Utils.showErr(error);
      }
    )
  };

  $scope.onStationChange = function () {
    Utils.show();
    $scope.fields=[];
    apiHelper.getFields($scope.data.selectedStation).then(
      function (success) {
        Utils.hide();
        $scope.fields = success.data.data;
      },
      function (error) {
        Utils.hide();
        Utils.showErr(error);
      }
    );
  };

  $scope.chartOption = chartUtils.option;
  $scope.getPieData = function (index) {
    var field = $scope.fields[index];
    return chartUtils.getData(field.current_volume, field.field_volume);
  };

  $scope.goDetail = function(index){
    // alert(index+"");
    $state.go('detail',{field_code:$scope.fields[index].field_code});
  };

});
