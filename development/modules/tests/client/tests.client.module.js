(function (app) {
  'use strict';

  app.registerModule('tests', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('tests.services');
  app.registerModule('tests.routes', ['ui.router', 'core.routes', 'tests.services']);
}(ApplicationConfiguration));
