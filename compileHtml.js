"use strict";

module.exports = function(html) {
  if (alquimia.env === alquimia.ENV_DEV) {
    html.head.children.push('<script type="text/javascript" src="js/templates.js"></script>');
  }

  return html;
};
