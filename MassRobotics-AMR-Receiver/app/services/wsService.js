const Torso = require('torso');
const _ = require('underscore');
const port = require('../../server/props').port;

module.exports = new (Torso.ServiceCell.extend({

  initialize: function(opts = {}) {
    _.defaults(opts, {
      autoReconnect: true
    })
    this.set('autoReconnect', opts.autoReconnect);
    this.activate();
  },

  activate: function() {
    this.connect();
  },

  deactivate: function() {
    this.disconnect();
  },

  isConnected: function() {
    return this.get('connected');
  },

  connect: function() {
    if (this.isConnected()) {
      return;
    }
    let protocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:';
    let socketAddress = `${protocol}//${window.location.host}${window.location.pathname}ui`;
    this.socket = new WebSocket(socketAddress);
    this.socket.onmessage = _.bind(this.onMessage, this);
    this.socket.onclose = _.bind(this.onClose, this);
    this.socket.onopen = _.bind(this.onOpen, this);
  },

  disconnect: function() {
    if (!this.isConnected()) {
      return;
    }
    this.socket.close();
  },

  send: function(message) {
    this.socket.send(JSON.stringify(message));
  },

  onMessage: function(msg) {
    let message = JSON.parse(msg.data);
    this.trigger('inbound-message', message);
  },

  onOpen: function() {
    this.set('connected', true);
  },

  onClose: function() {
    this.set('connected', false);
    if (this.get('autoReconnect')) {
      _.delay(() => {
        if (this.get('autoReconnect')) {
          this.connect();
        }
      }, 1000);
    }
  },
}))();