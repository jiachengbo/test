(function () {
  'use strict';

  angular
    .module('muser')
    .controller('MUserGridController', MUserGridController);

  MUserGridController.$inject = ['$scope', 'Notification', '$log', '$window', '$state',
    'uiGridConstants', '$stateParams'];
  function MUserGridController($scope, Notification, $log, $window, $state,
                                       uiGridConstants, $stateParams) {
    var vm = this;
    //部门下所有岗位数据
    vm.muser_rows = $stateParams.muser_rows;

    //ui-gird 基本配置参数
    vm.gridOptions = {
      //表数据
      data: vm.muser_rows,
      columnDefs: [
        {field: 'id', displayName: '用户编号'},
        {field: 'username', displayName: '登录名'},
        {field: 'firstName', displayName: '显示名称头'},
        {field: 'lastName', displayName: '显示名称尾'},
        {field: 'roles', displayName: '特殊权限'}
      ]
    };
  }
}());
