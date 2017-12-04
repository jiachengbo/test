(function (app) {
  'use strict';

  app.registerModule('department', ['users.admin']);
  app.registerModule('department.routes', ['users.admin.routes', 'department.services']);
  app.registerModule('department.services');
}(ApplicationConfiguration));
