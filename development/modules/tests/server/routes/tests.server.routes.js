'use strict';

/**
 * Module dependencies
 */
var testsPolicy = require('../policies/tests.server.policy'),
  tests = require('../controllers/tests.server.controller');

module.exports = function (app) {
  // Tests collection routes
  app.route('/api/tests').all(testsPolicy.isAllowed)
    .get(tests.list)
    .post(tests.create);
  // Single tests routes
  app.route('/api/tests/:testsId').all(testsPolicy.isAllowed)
    .get(tests.read)
    .put(tests.update)
    .delete(tests.delete);

  // Finish by binding the tests middleware
  app.param('testsId', tests.testsByID);
};
