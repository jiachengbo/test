(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Notification', '$log', 'Authentication', 'menuService',
    /*'Socket', */'TorecService', '$location', '$state'];

  function HeaderController($scope, Notification, $log, Authentication, menuService,
                            /*Socket, */TorecService, $location, $state) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;

    //vm.menu = menuService.getMenu('sidemenu');
    vm.menus = menuService;

    //用户待处理任务
    vm.userWaitHandles = [];
    vm.stateChangeMsg = [];
    vm.show = ($location.absUrl().indexOf('/authentication/signin') !== -1 ? 0 : 1);
    vm.role = ['user'];
    // vm.itemClick = function (params, type) {
    //   switch (params) {
    //     case 'jcxxgl':
    //       vm.role.push('jcxxgl');
    //       break;
    //     case 'xcjy':
    //       vm.role.push('xcjy');
    //       break;
    //     case 'cityjcdj':
    //       vm.role.push('cityjcdj');
    //       break;
    //     case 'jcxxgl':
    //       vm.role.push('jcxxgl');
    //       break;
    //     default:
    //       break;
    //   }
    //   // Authentication.user.roles = vm.role;
    //   // $state.go('home');
    //   console.log(vm.role);
    // };
/*
     //取得用户的待处理任务信息
     if (vm.authentication.user) {
     getWaitHandleTorec();
     } else {
     //在用户登录后，再获取
     $scope.$on('userLogin', getWaitHandleTorec);
     }

     // Make sure the Socket is connected
     if (!Socket.socket) {
     //等候socket有效
     $scope.$on('socketCreate', initSocket());
     } else {
     initSocket();
     }

     function initSocket() {
     //进入状态
     Socket.on('STATEIN', function (req) {
     var reqRec = buildReq(req);
     if (typeof(reqRec) === 'object' &&
     (!reqRec.msgrecv || !reqRec.msgrecv.desc)) {
     reqRec = 'socket STATEIN col msgsend.desc not valid error';
     }

     if (typeof(reqRec) === 'string') {
     $log.error('socket STATEIN req struct error:', reqRec);
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '状态改变通知，格式错误'});
     return;
     }

     $log.debug('socket STATEIN reqRec:', reqRec);
     vm.stateChangeMsg.push(reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '状态改变通知：' + reqRec.msgrecv.desc });
     });

     //离开状态
     Socket.on('STATEOUT', function (req) {
     var reqRec = buildReq(req);
     if (typeof(reqRec) === 'object' &&
     (!reqRec.msgrecv || !reqRec.msgrecv.desc)) {
     reqRec = 'socket STATEOUT col msgsend.desc not valid error';
     }

     if (typeof(reqRec) === 'string') {
     $log.error('socket STATEOUT req struct error:', reqRec);
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '状态改变通知，格式错误'});
     return;
     }

     $log.debug('socket STATEOUT reqRec:', reqRec);
     vm.stateChangeMsg.push(reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '状态改变通知：' + reqRec.msgrecv.desc });
     });

     //任务派遣,必须回应，否则发送端会连续发送多次（3）,最后发送端失败
     Socket.on('DISPATCH', function (req, fn) {
     var reqRec = buildReq(req);
     if (typeof(reqRec) === 'object' &&
     (!reqRec.msgrecv || !reqRec.msgrecv.torec)) {
     reqRec = 'socket DISPATCH col msgsend.torec not valid error';
     }
     if (typeof(reqRec) === 'string') {
     $log.error('socket DISPATCH req struct error:', reqRec);
     fn({message: '任务派遣命令，格式错误:' + reqRec});
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '任务派遣，格式错误'});
     return;
     }

     //记录发送的任务
     vm.userWaitHandles.push(reqRec.msgrecv.torec);

     //回应
     fn(null, '成功返回');

     $log.debug('socket DISPATCH reqRec:', reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '任务派遣：' + reqRec.msgrecv.desc });
     });

     // Remove the event listener when the controller instance is destroyed
     $scope.$on('$destroy', function () {
     Socket.removeListener('STATEIN');
     Socket.removeListener('STATEOUT');
     Socket.removeListener('DISPATCH');
     });
     }

     // 检验并生成请求结构
     function buildReq(req) {
     if (!req || typeof(req) !== 'object') {
     return 'socket request data not valid error';
     }

     var reqRec = {};
     //收到的请求id
     if (typeof(req.id) !== 'number') {
     return 'socket request col id not valid error';
     } else {
     reqRec.reqid = req.id.toString();
     }

     //收到消息中的时间,以字符串方法传送
     if (!(typeof(req.lastsend_time) === 'string')) {
     return 'socket request col lastsend_time not valid error';
     } else {
     reqRec.first_time = new Date(req.lastsend_time);
     }

     //收到消息尝试次数
     if (typeof(req.attempttimes) !== 'number') {
     return 'socket request col attempttimes not valid error';
     } else {
     reqRec.attempttimes = req.attempttimes;
     }

     reqRec.msgrecv = req.msgsend;
     reqRec.lastrecv_time = new Date();

     //发送内容
     reqRec.msgsend = null;
     //发送时间
     reqRec.lastsend_time = null;
     //结果不需要，接收函数返回结果
     //reqRec.result = RESULT.NOCOMPLETE;

     return reqRec;
     }

     //取得用户的待处理任务信息
     function getWaitHandleTorec() {
     var queryParam = {
     where: {
     lastact_recvuserid: {$like: '%,' + Authentication.user.id + ',%'}
     },
     order: 'Torec.lastact_time ASC'
     };

     //查询Torec表
     return TorecService.query(queryParam)
     .then(function(data) {
     if (data && Array.isArray(data)) {
     $log.debug('query torec user tasks return %d records', data.length);
     data.forEach(function (v) {
     vm.userWaitHandles.push(v);
     });
     } else {
     throw new Error('query torec user tasks respon format error');
     }
     })
     .catch(function (err) {
     $log.error('query torec user tasks error:', err);
     });
     }
     vm.openStateChangeMsgModal = function (resarg) {
     return $uibModal.open({
     templateUrl: '/modules/global/client/views/stateChangeMsgModal.client.view.html',
     controller: 'StateChangeMsgController',
     controllerAs: 'vm',
     backdrop: 'static',
     size: 'lg',
     resolve: resarg
     });
     };
     vm.openStateChangeMsgModalInstance = function () {
     var StateChangeMsgModalInstance = vm.openStateChangeMsgModal({
     msgData: function () {
     return vm.stateChangeMsg;
     }
     });
     StateChangeMsgModalInstance.result.then(function (result) {
     $log.log('modal ok:', result);
     vm.stateChangeMsg = [];
     });
     };
     vm.openTaskMsgModal = function (resarg) {
     return $uibModal.open({
     templateUrl: '/modules/global/client/views/taskMsgModal.client.view.html',
     controller: 'TaskMsgModalController',
     controllerAs: 'vm',
     backdrop: 'static',
     size: 'lg',
     resolve: resarg
     });
     };
     vm.openTaskMsgModalInstance = function () {
     var TaskMsgModalInstance = vm.openTaskMsgModal({
     taskData: function () {
     return vm.userWaitHandles;
     }
     });
     TaskMsgModalInstance.result.then(function (result) {
     $log.log('modal ok:', result);
     vm.userWaitHandles = [];
     });
     };
*/
  }
}());
