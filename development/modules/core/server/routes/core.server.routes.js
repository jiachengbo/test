'use strict';

var path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);
  app.route('/api/jcdjuser').get(core.jcdjuser);
  // Return a 404 for all undefined api, module or lib routes
  var paths = ['api', 'modules', 'lib'];
  if (config.uploads) {
    paths.push(config.uploads.rootMountDir.replace(/^\//, ''));
  }
  if (config.map) {
    paths.push(config.map.rootMountDir.replace(/^\//, ''));
  }

  app.route('/:url(' + paths.join('|') + '|)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
