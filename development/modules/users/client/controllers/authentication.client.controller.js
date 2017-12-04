(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', '$timeout',
    'Authentication', 'PasswordValidator', 'Notification'];

  function AuthenticationController($scope, $state, UsersService, $location, $window, $timeout,
                                    Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    $timeout(function () {
      if ($state.previous && $state.previous.state && $state.previous.state.data && $state.previous.state.data.pageTitle) {
        vm.signTitle = $state.previous.state.data.pageTitle;
      } else {
        vm.signTitle = $window.sharedConfig.longTitle;
      }
    });

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({message: $location.search().err});
    }

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    function signin(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      console.log($window.escape(vm.credentials));
      console.log($window.unescape($window.escape(vm.credentials)));
      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      //注册成功
      vm.authentication.signup(true);
      Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!'});
      // And redirect to the previous or home page
      $window.open('', '_self');
      // $state.go(($state.previous && $state.previous.state && $state.previous.state.name) || 'home', $state.previous && $state.previous.params);
    }

    function onUserSignupError(response) {
      Notification.error({
        message: response.data.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!',
        delay: 6000
      });
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      //登录成功
      vm.authentication.signin(true);

      Notification.info({message: '欢迎使用 ' + response.firstName});
      // And redirect to the previous or home page
      $window.location.reload();
      $window.open('/', '_self');
      // $state.go(($state.previous && $state.previous.state && $state.previous.state.name) || 'home', $state.previous && $state.previous.params);
    }

    function onUserSigninError(response) {
      Notification.error({
        message: response.data.message,
        title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!',
        delay: 6000
      });
    }

    vm.showa = function () {
      console.log(vm.radio);
    };

    var a = 1;
    vm.donghua = function () {
      if (a) {
        $('.shang').animate({
          height: '500px',
          top: '-270px'
        }, 3000);
        $('.xia').animate({
          height: '368px',
          top: '755px'
        }, 3000);
        a = 0;
      } else {
        $('.shang').animate({
          height: '500px',
          top: '0px'
        }, 3000);
        $('.xia').animate({
          height: '600px',
          top: '390px'
        }, 3000);
        a = 1;
      }
    };
  }
}());
