const Torso = require('backbone-torso');
const _ = require('underscore');
const $ = require('jquery');
const wsService = require('../services/wsService');

module.exports = new (Torso.FormView.extend({
  className: 'home',
  prepareFields: [
    'messages'
  ],

  events: {
    'click .test-message': 'sendTestMessage',
    'click .clear-messages': 'clearMessages'
  },

  /**
   * The handlebars template used by this view
   * @property template {Template}
   */
  template: require('./home-template.hbs'),

  initialize: function() {
    this.messages = [];
    this.on('change', this.render);
    this.listenTo(wsService, 'inbound-message', this.onNewMessage);
    this.wsService = wsService;
  },

  onNewMessage: function(message) {
    this.messages.push(message);
    this.render();
  },

  sendTestMessage: function() {
    $.get('/test-message').done((res) => {
      wsService.send(res);
    });
  },

  clearMessages: function() {
    this.messages = [];
    this.render();
  }
}))();