"use strict";

module.exports = function(defaults) {
  defaults.getElement('angular').push('angular-route');
  defaults.getElement('modules').push('ngRoute');

  return defaults;
};
