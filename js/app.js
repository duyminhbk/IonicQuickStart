'Use Strict';
angular.module('App', ['ionic', 'angles', 'ngStorage', 'ngCordova', 'firebase', 'ngMessages'])
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.interceptors.push(function ($rootScope, $q) {
      return {
        request: function (config) {
          config.timeout = 5000;
          return config;
        },
        responseError: function (rejection) {
          switch (rejection.status) {
            case 408:
              console.log('connection timed out');
              break;
          }
          return $q.reject(rejection);
        }
      }
    });
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
      })
      .state('setting', {
        url: '/setting',
        templateUrl: 'views/setting/setting.html',
        controller: 'settingController'
      })
      .state('detail', {
        url: '/detail',
        templateUrl: 'views/detail/detail.html',
        controller: 'detailController',
        params: { 'field_code': null }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeController',
      })
      ;
    $urlRouterProvider.otherwise("/login");
  })
  // Changue this for your Firebase App URL.
  .constant('FURL', 'https://asfirebase.firebaseio.com/')
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      document.addEventListener("offline",
        function () {
          alert("You are offline. Please check your connection");
        },
        false);
    });
  });
