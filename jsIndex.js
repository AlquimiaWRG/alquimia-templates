"use strict";

module.exports = function(defaultJs) {
  defaultJs.getElement('angular').push('angular-route');
  defaultJs.getElement('modules').push('ngRoute');

  return defaultJs;
};
