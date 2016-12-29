'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils, apiHelper) {
  // $localStorage.userkey = userkey;
  // $scope.user = {};
  //demo
  $scope.user = apiHelper.user;
  $scope.login = function (user) {
    console.log("do login");
    if (angular.isDefined(user)) {
      Utils.show();
      apiHelper.login(user).then(
        function (response) {
          Utils.hide();
          apiHelper.user.username = response.data.data.username;
          apiHelper.user.name = response.data.data.name;
          // Utils.alertshow("success", "The data " + JSON.stringify(apiHelper.user));
          $state.go('home');
          console.log("Starter page", "Home");
        },
        function (err) {
          Utils.hide();
          Utils.showErr(err);
        });
    }
  };

});
