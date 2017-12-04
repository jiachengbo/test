(function () {
  'use strict';

  angular
    .module('muser')
    .controller('MUserEditController', MUserEditController);

  MUserEditController.$inject = ['$scope', 'Notification', '$log', '$window', '$state', '$stateParams',
    'treeService', 'WorkPositionService', 'localStorageService', '$timeout'];
  function MUserEditController($scope, Notification, $log, $window, $state, $stateParams,
                               treeService, WorkPositionService, localStorageService, $timeout) {
    var vm = this;
    //当前行数据
    vm.muser_row = $stateParams.muser_row;
    //部门、岗位表所有数据
    vm.department_rows = $stateParams.department_rows;
    vm.workposition_rows = $stateParams.workposition_rows;
    //进行的操作
    vm.muser_rowop = $stateParams.muser_rowop;
    //不能修改
    vm.disabled = vm.muser_rowop.disabled;

    //设置cvm，用于回传本控制
    vm.muser_rowop.cvm = vm;

    vm.treeOptions = {
      dirSelectable: true,
      allowDeselect: false,
      //是否是文件,显示不同图标
      isLeaf: function (node) {
        return vm.isWorkPositionNode(node);
      }
    };

    vm.treeData = {};
    vm.expanded = [];
    vm.selected = null;

    vm.isWorkPositionNode = function (node) {
      return node.value instanceof WorkPositionService;
    };

    //列表显示的内容
    vm.treeTitle = function (node) {
      return node.value.displayName ? node.value.displayName : node.value.name;
    };
    //显示选择行
    vm.showSelected = function (sel) {
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
      }
    };
    vm.changed = function (node) {
      var workposition = {id: node.value.id};
      //删除当前数据保存的指定workposition.id的记录
      for (var index = 0; index < vm.muser_row.wps.length; index++) {
        if (vm.muser_row.wps[index].id === workposition.id) {
          vm.muser_row.wps.splice(index, 1);
          break;
        }
      }
      if (node.value.selected) {
        vm.muser_row.wps.push(workposition);
      }
    };
    var workpositions = vm.workposition_rows.map(function (ele) {
      ele.selected = vm.muser_row.wps.some(function (workposition) {
        return ele.id === workposition.id;
      });
      return ele;
    });
    vm.serviceTree = treeService.getTreeData(vm.department_rows, 'id', 'parentId', 'children',
      vm.workposition_rows, 'department_id');
    vm.treeData = vm.serviceTree.getNodes();
    vm.showSelected(vm.treeData[0]);
    vm.show = false;
    vm.partyList11 = localStorageService.getItems('dj_JCDJ_UserRole');
    vm.partyList12 = localStorageService.getItems('dj_PartyOrganization');
    vm.dj_PartyBranch = localStorageService.getItems('dj_PartyBranch');
    vm.dj_PartyGeneralBranch = localStorageService.getItems('dj_PartyGeneralBranch');
    vm.partyzhibu = [];
    vm.disableds = false;
    //"UserRoleID":1,"UserRoleName":"区级党员","descriptor":"区级党员","UserGradeID":1,"departy":100
    vm.changedrole = function (num) {
      num = JSON.parse(num);
      vm.nums = num;
      vm.partyzhibu = [];
      vm.partybranch = [];
      if (num.UserGradeID === 4 || num.UserGradeID === 5) {
        vm.show = false;
        vm.jiedao = false;
        angular.forEach(vm.dj_PartyBranch, function (value, key) {
          if (value.super === num.departy) {
            this.push(value);
          }
        }, vm.partybranch);
      } else {
        vm.show = true;
        vm.jiedao = true;
      }
      if (num.UserGradeID === 3 || num.UserGradeID === 2 || num.UserGradeID === 6 || num.UserGradeID === 7 || num.UserGradeID === 9 || num.UserGradeID === 10) {
        vm.partybranch = [];
        vm.disableds = true;
        if (num.UserGradeID === 6 || num.UserGradeID === 2 || num.UserGradeID === 9) {
          vm.muser_row.party = '1';

        } else {
          vm.muser_row.party = '2';
        }
        if (num.UserGradeID !== 9 && num.UserGradeID !== 10) {
          vm.jiedao = true;
          vm.zongzhi = false;
          angular.forEach(vm.partyList12, function (value, key) {
            if (value.comType === $window.parseInt(vm.muser_row.party)) {
              this.push(value);
            }
          }, vm.partyzhibu);
        } else {
          vm.jiedao = false;
          vm.zongzhi = true;
          angular.forEach(vm.dj_PartyGeneralBranch, function (value, key) {
            if (value.mold === $window.parseInt(vm.muser_row.party)) {
              this.push(value);
            }
          }, vm.partyzhibu);
        }
      } else {
        vm.disableds = false;
        vm.muser_row.party = '';
      }
    };
    vm.changedparty = function (num) {
      num = JSON.parse(num);
      vm.partyzhibu = [];
      vm.partybranch = [];
      angular.forEach(vm.partyList12, function (value, key) {
        if (value.comType === num) {
          this.push(value);
        }
      }, vm.partyzhibu);
    };
    vm.changedstreet = function (num) {
      if (num) {
        num = JSON.parse(num);
        vm.partybranch = [];
        if (angular.isObject(num)) {
          angular.forEach(vm.dj_PartyBranch, function (value, key) {
            if (value.generalbranch === num.branchID && value.super === num.superior) {
              this.push(value);
            }
          }, vm.partybranch);
        } else {
          angular.forEach(vm.dj_PartyBranch, function (value, key) {
            if (value.super === num) {
              this.push(value);
            }
          }, vm.partybranch);
        }
      }
    };
  }
}());
