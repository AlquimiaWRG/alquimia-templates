"use strict";

module.exports = function(done) {
  error('Please remove manually your "' + (alquimia.config.viewsDir || 'templates') + '" directory.\n');
  delete alquimia.config.viewsDir;
  delete alquimia.config.viewsFile;
  done();
};
