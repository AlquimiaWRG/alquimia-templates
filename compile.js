"use strict";

module.exports = function(watchers) {
  var minifier = require('html-minifier');
  var fs = require('fs');
  var appDir = alquimia.getPath('appDir');
  var compiledScriptsDir = alquimia.getPath('compiledScriptsDir');
  var viewsDir = alquimia.config.viewsDir || 'views';
  var viewsFile = alquimia.config.viewsFile || 'templates';

  // https://github.com/kangax/html-minifier#options-quick-reference
  var options = {
    removeComments: true,
    collapseWhitespace: true
  };
  var appName = alquimia.config.appName.camelCase;

  watchers.push({
    watch: appDir + '/' + viewsDir + '/**/*.html',
    notify: appDir + '/' + compiledScriptsDir + '/' + viewsFile + '.js',
    compile: function(done) {
      var templateCacheScript = ["var module = angular.module('" + appName + "');"];
      templateCacheScript.push("module.run(['$templateCache', function($templateCache) {");

      alquimia.traverse(appDir + '/' + viewsDir, function(file, isDirectory) {
        if (!isDirectory) {
          var path = file.split('/').slice(1).join('/');
          var content = parse(minifier.minify(fs.readFileSync(file, 'utf-8'), options));
          templateCacheScript.push("  $templateCache.put('" + path + "', '" + content + "');");
        }
      });

      templateCacheScript.push('}]);');
      fs.writeFileSync(appDir + '/' + compiledScriptsDir + '/' + viewsFile + '.js', templateCacheScript.join('\n'), 'utf8');
      done();
    }
  });

  return watchers;

  function parse(html) { return html.replace(/'/g, "\\'").replace(/\\\\'/g, "\\\\\\'"); }
};
