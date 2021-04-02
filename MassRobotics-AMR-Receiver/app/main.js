const $ = require('jquery');
const Backbone = require('backbone');
require('./helpers');
Backbone.$ = $;

// Expose some globals
window.$ = $;
window.jQuery = $;

$(window).ready(function () {
  /**
   * The application router object
   */
  let router = require('./router');
  router.start();
  window.app = router;
});

