(function () {
  'use strict';

  angular
    .module('tests')
    .controller('TestsModalFormController', TestsModalFormController);

  TestsModalFormController.$inject = ['$scope', '$uibModalInstance', 'testsData', 'method'];
  function TestsModalFormController($scope, $uibModalInstance, testsData, method) {
    var vm = this;
    vm.testsData = testsData;
    vm.method = method;
    vm.disabled = (method === 'view');

    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.testsForm');
        return;
      }
      $uibModalInstance.close(vm.testsData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
