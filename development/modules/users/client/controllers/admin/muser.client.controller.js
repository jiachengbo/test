(function () {
  'use strict';

  angular
    .module('muser')
    .controller('MUserController', MUserController);

  MUserController.$inject = ['$scope', '$log', '$window', 'Notification', '$state', '$timeout', 'treeService',
    'AdminService', 'departmentResolve', 'workpositionResolve', 'muserResolve'];
  function MUserController($scope, $log, $window, Notification, $state, $timeout, treeService,
                                  AdminService, departmentResolve, workpositionResolve, muserResolve) {
    var vm = this;
    vm.treeOptions = {
      dirSelectable: true,
      allowDeselect: false,
      //是否是文件,显示不同图标
      isLeaf: function (node) {
        return vm.isMuserNode(node);
      }
    };

    //初始变量必须定义为空对象，当查询数据库，取出数组值时再进行替换
    //如果初始变量定义为空数组，当查询数据库，没有列表时，数值也是空数组，
    //    treecontrol后台监视判断两者相等，就不会记录新的_showEdit空数组 vm.treeData !== treecontrol.socpe.node.children
    vm.treeData = {};
    vm.expanded = [];
    vm.selected = null;
    vm.currDepartmentNode = null;
    vm.currMUser = null;
    vm.currMUserOp = {};

    vm.isMuserNode = function (node) {
      return node.value instanceof AdminService;
    };

    //列表显示的内容
    vm.treeTitle = function(node) {
      return node.value.displayName ? node.value.displayName : node.value.name;
    };

    //拖动处理
    vm.canDrag = function (node) {
      return vm.isMuserNode(node) && vm.disabled;
    };
    vm.canDrop = function (node) {
      return !vm.isMuserNode(node);
    };
    //参数：$data=>移动的node数据
    //参数：node=>移动的目标
    vm.dropComplete = function(snode, dnode) {
      if (!snode || !dnode) {
        $log.error('drop complete move node error:', snode, dnode);
        return;
      }

      //没有改变父
      if (snode.parent === dnode) {
        return;
      }

      //更新用户对应部门编码
      snode.value.department_id = dnode.value.id;
      snode.value.$update()
        .then(function(res) {
          //移动的node设置为当前
          vm.showSelected(vm.serviceTree.moveNode(snode, dnode));
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> workposition draggdrop saved successfully!' });
        })
        .catch(function(err) {
          $log.error('workposition update save error:', err.data.message);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> workposition draggdrop save error!' });
        });
    };

    //编辑界面操作调用
    vm._showEdit = function () {
      vm.currMUserOp = {disabled: vm.disabled, cvm: null};
      $state.go('admin.muser.edit', {
        muser_row: vm.currMUser,
        muser_rowop: vm.currMUserOp,
        workposition_rows: workpositionResolve,
        department_rows: departmentResolve
      });
    };

    //显示选择行
    vm.showSelected = function(sel) {
      vm.disabled = true;
      if (vm.currMUserOp && vm.currMUserOp.cvm && vm.currMUserOp.cvm.muserForm) {
        //清除form错误提示
        $scope.$broadcast('show-errors-reset', vm.currMUserOp.cvm.muserForm.$name);
      }

      if (sel) {
        //展开父
        if (vm.expanded.indexOf(sel.parent) === -1) {
          if (sel.parent) {
            vm.expanded.push(sel.parent);
          } else {
            vm.expanded.push(sel);
          }
        }

        vm.selected = sel;

        //如果选择了用户,跳转到列表，否则跳转到内容
        if (!vm.isMuserNode(sel)) {
          vm.currDepartmentNode = sel;
          vm.currMUser = null;

          var muser_rows = [];
          sel.children.forEach(function (row) {
            if (vm.isMuserNode(row)) {
              muser_rows.push(row.value);
            }
          });
          $timeout(function () {
            $state.go('admin.muser.grid', {muser_rows: muser_rows});
          });
        } else {
          vm.currDepartmentNode = sel.parent;
          vm.currMUser = angular.copy(sel.value);

          //默认查看
          vm._showEdit();
        }

      } else {
        vm.selected = vm.currDepartmentNode = vm.currMUser = null;
      }
    };

    //开始修改
    vm.update = function() {
      vm.disabled = false;
      vm._showEdit();
    };

    //取消修改
    vm.cancel = function() {
      vm.showSelected(vm.selected);
    };

    //增加
    vm.add = function() {
      var newvalue = new AdminService();
      //设置岗位空
      newvalue.wps = [];
      //如果存在当前选择的部门，设置工作用户的部门
      if (vm.currDepartmentNode) {
        newvalue.department_id = vm.currDepartmentNode.value.id;
      } else {
        $window.alert('请先在部门管理中，增加部门，然后在增加用户！！！');
        return;
      }

      vm.currMUser = newvalue;
      vm.update();
    };

    // 删除
    vm.remove = function() {
      if ($window.confirm('确定要删除用户(' + vm.currMUser.displayName + ')吗?')) {
        vm.currMUser.$remove()
          .then(function() {
            vm.showSelected(vm.serviceTree.removeNode(vm.selected));
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> 用户已删除!' });
          })
          .catch(function(err) {
            $log.error('muser remove error:', err.data.message);
          });
      }
    };
    //保存
    vm.save = function() {
      if (!vm.currMUser) {
        $log.error('no currValue');
        return;
      }
      if (!vm.currMUserOp.cvm || !vm.currMUserOp.cvm.muserForm) {
        $log.error('edit children vm not set');
        return;
      }

      if (!vm.currMUserOp.cvm.muserForm.$valid) {
        $log.error('muserForm input not valid');
        $scope.$broadcast('show-errors-check-validity', vm.currMUserOp.cvm.muserForm.$name);
        return;
      }

      if (vm.currMUser.id) {
        console.log(333333333333);
        console.log(vm.currMUser);
        vm.currMUser.$update()
          .then(function(res) {
            //更新变量值
            vm.selected.value = res;
            vm.showSelected(vm.selected);
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> muser update saved successfully!' });
          })
          .catch(function(err) {
            $log.error('muser update save error:', err.data.message);
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> muser update save error!' });
          });
      } else {
        vm.currMUser.$save()
          .then(function(res) {
            vm.showSelected(vm.serviceTree.addValue2Node(res, vm.currDepartmentNode));
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> muser add saved successfully!' });
          })
          .catch(function(err) {
            $log.error('muser add save error:', err.data.message);
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> muser add save error!' });
          });
      }
    };

    //生成树形数据结构
    vm.serviceTree = treeService.getTreeData(departmentResolve, 'id', 'parentId', 'children',
      muserResolve, 'department_id');
    vm.treeData = vm.serviceTree.getNodes();
    //选择第一条
    vm.showSelected(vm.treeData[0]);
  }
}());
