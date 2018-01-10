(function () {
  'use strict';

  angular
    .module('tests')
    .controller('TestsModalFormController', TestsModalFormController);

  TestsModalFormController.$inject = ['$scope', '$uibModalInstance', 'testsData', 'method', '$timeout'];
  function TestsModalFormController($scope, $uibModalInstance, testsData, method, $timeout) {
    var vm = this;
    vm.testsData = testsData;
    vm.method = method;
    vm.disabled = (method === 'view');
    // $timeout(function () {
    //   $(document).ready(function() {
    //     $('#summernote').summernote();
    //   });
    // },200);
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
     // var html = $('[contenteditable="true"]').html();
     //  vm.testsData.content = html;
      var iframe = document.querySelector('#ifrmae');
      var html = iframe.contentWindow.document.querySelector('.panel-body').innerHTML;
      // var html = $(window.frames["ifrmae"].document).find("div[contenteditable='true']").html();
      vm.testsData.content = html;
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
