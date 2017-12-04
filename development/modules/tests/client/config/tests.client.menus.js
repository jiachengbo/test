(function () {
  'use strict';

  angular
    .module('tests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: 'word',
      state: 'tests',
      type: 'dropdown',
      roles: ['jcxxgl'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'tests', {
      title: 'word文件上传',
      state: 'tests.curd',
      roles: ['*']
    });

  }
}());
