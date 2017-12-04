(function () {
  'use strict';

  angular.module('core')
    .directive('autoHeight', autoHeight)
    .directive('autoMinHeight', autoMinHeight);

  function calcBoardHeight($window, element) {
    var diff = 0;
    return 0;
/*
    var style = $window.getComputedStyle(element[0]);
    var boardSizing = style.boxSizing;
    if (!boardSizing) {
      boardSizing = 'content-box';
    }
    boardSizing = boardSizing.toLowerCase();
    var tmp;
    if (boardSizing === 'content-box') {
      tmp = parseInt(style.paddingTop, 10);
      if (!isNaN(tmp)) diff += tmp;
      tmp = parseInt(style.paddingBottom, 10);
      if (!isNaN(tmp)) diff += tmp;

      tmp = parseInt(style.borderTopWidth, 10);
      if (!isNaN(tmp)) diff += tmp;
      tmp = parseInt(style.borderBottomWidth, 10);
      if (!isNaN(tmp)) diff += tmp;
    }

    tmp = parseInt(style.marginTop, 10);
    if (!isNaN(tmp)) diff += tmp;
    tmp = parseInt(style.marginBottom, 10);
    if (!isNaN(tmp)) diff += tmp;
    return diff;
*/
  }

  function calcHeight($window, autoValue, element) {
    var winowHeight = $window.innerHeight; //获取窗口高度
    var headerHeight = 191;
    var footerHeight = 50;

    var height = winowHeight - headerHeight - footerHeight;
    if (autoValue) {
      autoValue = autoValue.trim();
      if (autoValue[autoValue.length - 1] === '%') {
        var per = parseInt(autoValue.substr(0, autoValue.length - 1), 10);
        if (!isNaN(per)) {
          height *= per / 100;
        }
      } else {
        var dirValue = parseInt(autoValue, 10);
        if (!isNaN(dirValue)) {
          height += dirValue;
        }
      }
    }
    return height - calcBoardHeight($window, element);
  }

  autoHeight.$inject = ['$window'];
  function autoHeight($window) {
    return {
      priority: 1005,
      restrict: 'A',
/*
      //需要和其他指令配置执行，而其他指令如果有scope,就会冲突，所以去掉，直接从attrs中读取
      scope: {
        autoHeight: '@'
      },*/
      link: function(scope, element, attrs) {
        element.css('height', calcHeight($window, attrs.autoHeight + 50, element) + 'px');
      }
    };
  }

  autoMinHeight.$inject = ['$window'];
  function autoMinHeight($window) {
    return {
      priority: 1005,
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.css('min-height', calcHeight($window, attrs.autoMinHeight, element) + 'px');
      }
    };
  }
}());
