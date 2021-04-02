var Torso = require('torso'),
    $ = require('jquery');

module.exports = new (Torso.Router.extend({
  current: null,
  routes: {
    '': 'index'
  },

  /**
   * Stop the history if it's already started. Bind the routes, and start.
   * and start the history.
   * @method start
   */
  start: function() {
    Torso.history.stop();
    this._bindRoutes();
    Torso.history.start();
  },

  /**
   * Initialize the base home view
   */
  index: function() {
    this.switchPerspective(require('./home/homeView'));
  },

  /**
   * Switches the current perspective to be the given perspective.
   */
  switchPerspective: function(nextPerspective) {
    if (this.current) {
      this.current.detach();
    }

    this.current = nextPerspective;
    this.current.attachTo($('.app'));
  }
}))();