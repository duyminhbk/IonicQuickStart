'Use Strict';
angular.module('App').controller('settingController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, Utils,apiHelper) {
  $scope.data = {};
  $scope.changePass = function(){
    // verify and submid change pass
    if(!$scope.data.oldPass){
      showAlert("Please input your old password");
      return;
    }
    if(!apiHelper.checkPass($scope.data.oldPass)){
      showAlert("Your old password not match");
      return;
    }
    if(!$scope.data.newPass){
      showAlert("Please input your new password");
      return;
    }
    if(!$scope.data.confirmPass){
      showAlert("Please confirm your password");
      return;
    }

    if($scope.data.newPass != $scope.data.confirmPass ){
      showAlert("Your confirm password not match");
      return;
    }

    apiHelper.changePassword($scope.data.newPass).then(
      function (success) {
        $location.path("/login");
      },
      function (fail) {
        Utils.showErr(fail);
      }
    );
  }

  var showAlert = function(content){
      Utils.alertshow("Warning",content);
  }
}
);
