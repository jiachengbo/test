(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
/*
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '例子用户管理',
      state: 'admin.users'
    });
*/
  }
}());
