(function () {
  'use strict';

  angular
    .module('tests')
    .controller('TestsCURDTableController', TestsCURDTableController);

  TestsCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window',
    'uiGridConstants', 'TestsService',
    '$uibModal'];
  function TestsCURDTableController($scope, Notification, $log, $window,
                                       uiGridConstants, TestsService, $uibModal) {
    var vm = this;
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function(resarg) {
      return $uibModal.open({
        templateUrl: '/modules/tests/client/views/tests-modal-form.client.view.html',
        controller: 'TestsModalFormController',
        controllerAs: 'vm',
        size: 'lg',
        backdrop: 'static',
        resolve: resarg
      });
    };

    //增加数据
    vm.add = function() {
      var modalInstance = vm._openModal({
        //tests会传入modal的controller
        testsData: function() {
          //空数据
          return new TestsService();
        },
        //表明是增加
        method: function() {
          return 'add';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function(result) {
        $log.log('modal ok:', result);
        result.$save()
          .then(function(res) {
            vm.gridOptions.data.push(res);
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> tests add saved successfully!' });
          })
          .catch(function(err) {
            $log.error('tests add save error:', err.data.message);
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' tests add save error!' });
          });
      })
      .catch(function(reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //删除数据
    vm.remove = function() {
      if ($window.confirm('Are you sure you want to remove selected record?')) {
        vm.selectedRow.$remove(function() {
          var rowindex = vm.tableData.indexOf(vm.selectedRow);
          //去掉表格中的数据
          vm.tableData.splice(rowindex, 1);
          //复位当前行
          vm.selectedRow = null;
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> tests deleted successfully!' });
        })
        .catch(function(err) {
          $log.error('tests deleted error:', err.data.message);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
          ' tests delete error!' });
        });
      }
    };

    //修改或查看数据
    vm._updateorview = function(isupdate) {
      var modalInstance = vm._openModal({
        testsData: function() {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function() {
          return isupdate ? 'update' : 'view';
        }
      });

      modalInstance.result.then(function(result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          result.$update()
            .then(function(res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res);
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> tests update saved successfully!' });
            })
            .catch(function(err) {
              $log.error('tests update save error:', err.data.message);
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
              'tests update save error!' });
            });
        }
      }).catch(function(reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //修改
    vm.update = function() {
      return vm._updateorview(true);
    };
    //查看
    vm.view = function() {
      return vm._updateorview(false);
    };

    //ui-gird 基本配置参数
    vm.gridOptions = {
      //表数据
      data: vm.tableData,
      columnDefs: [
        {field: 'title', displayName: '标题'},
        {field: 'content', displayName: '内容'}
      ],

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function(row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
        });
      },

      //如果不需要在表格左上角菜单显示功能，以下参数可以去掉
      //允许表格左上角菜单
      enableGridMenu: true,
      //添加自定义菜单
      gridMenuCustomItems: [
        {
          //标题
          title: '增加记录',
          //点击动作
          action: vm.add,
          //是否显示,返回true显示
          shown: function () {
            return true;
          },
          //次序，从200-300
          order: 210
        },
        {
          title: '编辑选择记录',
          action: vm.update,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 220
        },
        {
          title: '删除选择记录',
          action: vm.remove,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 230
        },
        {
          title: '查看选择记录',
          action: vm.view,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 240
        }
      ]
    };

    //取后台Tests表所有数据
    TestsService.query().$promise.then(function(data) {
      console.log(data[1].content);
      vm.gridOptions.data = vm.tableData = data;
    });
  }
}());
