(function () {
  'use strict';

  angular
    .module('global')
    .controller('homeWelcomeController', homeWelcomeController);

  homeWelcomeController.$inject = ['$state', 'menuService', 'Authentication'];
  function homeWelcomeController($state, menuService, Authentication) {
    var vm = this;
    vm.imgName = $state.$current.data.pageTitle;
    console.log(vm.imgName);
    if (Authentication.user) {
      menuService.leftMenusCollapsed = true;
    }
    if (Authentication.user2) {
      menuService.leftMenusCollapsed = false;
    }
    // vm.tiaozhuan = function (num) {
    //   var src = `/modules/global/client/img/home/活动${num}.png`;
    //   $('.first>img').attr('src', src);
    // };
  }
}());
