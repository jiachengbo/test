(function () {
  'use strict';

  angular
    .module('workposition')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '用户及权限',
      state: 'admin.muser',
      position: 400
    });
  }
}());
