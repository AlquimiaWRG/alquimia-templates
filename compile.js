"use strict";

module.exports = function(watchers) {
  var minifier = require('html-minifier');
  var fs = require('fs');

  // https://github.com/kangax/html-minifier#options-quick-reference
  var options = {
    removeComments: true,
    collapseWhitespace: true
  };
  var appName = alquimia.config.appName.camelCase;

  watchers.push({
    watch: 'app/views/**/*.html',
    notify: 'app/js/templates.js',
    compile: function(done) {
      var templateCacheScript = ["var module = angular.module('" + appName + "');"];
      templateCacheScript.push("module.run(['$templateCache', function($templateCache) {");

      alquimia.traverse('app/views', function(file, isDirectory) {
        if (!isDirectory) {
          var path = file.split('/').slice(1).join('/');
          var content = parse(minifier.minify(fs.readFileSync(file, 'utf-8'), options));
          templateCacheScript.push("  $templateCache.put('" + path + "', '" + content + "');");
        }
      });

      templateCacheScript.push('}]);');
      fs.writeFileSync('app/js/templates.js', templateCacheScript.join('\n'), 'utf8');
      done();
    }
  });

  return watchers;

  function parse(html) { return html.replace(/'/g, "\\'").replace(/\\\\'/g, "\\\\\\'"); }
};
