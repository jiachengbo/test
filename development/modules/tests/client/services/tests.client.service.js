(function () {
  'use strict';

  angular
    .module('tests.services')
    .factory('TestsService', TestsService);

  TestsService.$inject = ['$resource', '$log'];

  function TestsService($resource, $log) {
    var Tests = $resource('/api/tests/:testsId', {
      testsId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Tests.prototype, {
      createOrUpdate: function () {
        var tests = this;
        return createOrUpdate(tests);
      }
    });

    return Tests;

    function createOrUpdate(tests) {
      if (tests.id) {
        return tests.$update(onSuccess, onError);
      } else {
        return tests.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(tests) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
