(function () {
  'use strict';

  angular
    .module('workposition')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '工作岗位',
      state: 'admin.workposition',
      position: 300
    });
  }
}());
