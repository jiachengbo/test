(function () {
  'use strict';

  angular
    .module('tests.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tests', {
        abstract: true,
        url: '/tests',
        template: '<ui-view/>'
      })
      .state('tests.curd', {
        url: '/curd',
        templateUrl: '/modules/tests/client/views/tests-curdtable.client.view.html',
        controller: 'TestsCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tests CURD Table'
        }
      });
  }
}());
