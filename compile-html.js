"use strict";

module.exports = function(html) {
  if (alquimia.env === alquimia.ENV_DEV) {
    html.head.children.push('<script type="text/javascript" src="' + alquimia.getPath('compiledScriptsDir') +
      '/' + (alquimia.config.viewsFile || 'templates') + '.js"></script>');
  }

  return html;
};
