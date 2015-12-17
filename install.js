"use strict";

module.exports = function(done) {
  var fs = require('fs');

  try {
    fs.mkdirSync('app/views');
  } catch(e) {
    // app/views already exists. Never mind
  }

  done();
};
