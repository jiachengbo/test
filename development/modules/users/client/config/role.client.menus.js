(function () {
  'use strict';

  angular
    .module('role')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '权限管理',
      state: 'admin.role',
      position: 200
    });
  }
}());
