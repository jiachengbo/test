(function (app) {
  'use strict';

  app.registerModule('role', ['users.admin']);
  app.registerModule('role.routes', ['users.admin.routes']);
  app.registerModule('role.services');
}(ApplicationConfiguration));
