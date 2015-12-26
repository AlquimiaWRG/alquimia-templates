"use strict";

module.exports = function(done) {
  alquimia.del(alquimia.config.appName + '/' + alquimia.config.viewsDir || 'views');
  done();
};
