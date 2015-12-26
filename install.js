"use strict";

module.exports = function(done) {
  var fs = require('fs');

  try {
    fs.mkdirSync(alquimia.getPath('appDir') + '/views');
  } catch(e) {
    // app/views already exists. Never mind
  }

  alquimia.config.viewsDir = 'views';
  alquimia.config.viewsFile = 'templates';

  done();
};
