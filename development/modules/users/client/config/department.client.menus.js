(function () {
  'use strict';

  angular
    .module('department')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '部门管理',
      state: 'admin.department',
      position: 100
    });
  }
}());
