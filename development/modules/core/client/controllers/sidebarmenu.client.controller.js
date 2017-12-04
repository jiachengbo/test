(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidebarMenuController', SidebarMenuController);

  SidebarMenuController.$inject = ['$rootScope', '$state', '$window', 'Authentication', 'menuService', '$timeout'];

  function SidebarMenuController($rootScope, $state, $window, Authentication, menuService, $timeout) {
    var vm = this;

    vm.authentication = Authentication;
    //Authentication.user.roles =  ["user", "admin", "jcxxgl", "cityjcdj"]; // 基层城市党建
    console.log(Authentication);
    //Authentication.user.roles =  ["user", "admin", "jcxxgl", "jcxxgl"]; // 基础信息管理
    // $timeout(function () {
    vm.sidemenu = menuService.getMenu('sidemenu');
    vm.menus = menuService;
    console.log('菜单');
    console.log(vm.menus);

    for (var i = 0; i < vm.sidemenu.items.length; i++) {
      vm.sidemenu.items[i].icon2 = '/modules/core/client/img/header/符号.png';
      vm.sidemenu.items[i].icon1 = '/modules/core/client/img/header/符号.png';
    }
    // },1000);
    //只能有一个展开的菜单
    var prevMenuItem = null;
    vm.toggleMenuItem = function (menuitem) {
      if (!prevMenuItem) {
        menuitem.isCollapsed = false;
      } else if (prevMenuItem !== menuitem) {
        prevMenuItem.isCollapsed = true;
        menuitem.isCollapsed = false;
      } else {
        menuitem.isCollapsed = !menuitem.isCollapsed;
      }

      prevMenuItem = menuitem;
    };
    vm.iii = 'background-image: url(/modules/core/client/img/header/02.png);background-size: 100% 100%;color:#fff;';
    vm.aaa = 'background-image: url(/modules/core/client/img/header/按钮.png);background-size: 100% 100%';
    vm.clickMenuItem = function (menuitem) {
      //console.log('inwidth: %d, height: %d', $window.innerWidth, $window.innerHeight);
      collapsedMenu();
      //滚动到页面顶部
      $window.scrollTo(0, 0);
    };

    //如果路由改变
    $rootScope.$on('$stateChangeSuccess', collapsedMenu);

    //根据屏幕宽度，缩回菜单
    function collapsedMenu() {
      /*和core.css 对应
       @media (max-width: 767px) {
       body>.page-container {
       display: block;
       }
       }
       */
      if ($window.innerWidth <= 767) {
        menuService.leftMenusCollapsed = true;
      }
    }
    //初始化显示
    collapsedMenu();
  }
}());
