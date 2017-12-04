(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '系统管理',
      state: 'admin',
      type: 'dropdown',
      roles: ['xtsz'],
      position: 1000
    });
  }
}());
