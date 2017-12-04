(function () {
  'use strict';

  // Authentication service for user variables
  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$rootScope', '$window'];

  function Authentication($rootScope, $window) {
    var auth = {
      user: $window.user,
      signin: userLogin,
      signup: userLogin,
      //用户下线
      userOffline: userOffline
    };

    return auth;

    //注册登录成功或普通登录成功
    function userLogin() {
      $rootScope.$broadcast('userLogin');
    }
    //用户下线
    function userOffline() {
      $rootScope.$broadcast('userOffline');
    }
  }
}());
